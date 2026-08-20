-- Run in the Supabase SQL editor to create the invitation's guestbook.
-- Existing entries are preserved. No authentication is required for guests.
begin;

create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(btrim(name)) between 2 and 100),
  attendance text not null check (attendance in ('Hadir', 'Tidak Hadir', 'Masih Ragu')),
  guests integer check (guests between 1 and 5),
  message text check (char_length(message) <= 1000)
);

-- Older installations did not have this column.
alter table public.guestbook add column if not exists guests integer
  check (guests between 1 and 5);
alter table public.guestbook enable row level security;

create index if not exists guestbook_created_at_idx on public.guestbook (created_at desc);

-- Guests can submit responses and read public messages, but cannot edit or delete.
-- Replace the permissive policies shipped in the original floral template.
drop policy if exists "Public can read guestbook" on public.guestbook;
drop policy if exists "Public can insert guestbook" on public.guestbook;
drop policy if exists "Guests can leave a response" on public.guestbook;
create policy "Guests can leave a response" on public.guestbook
  for insert to anon with check (
    char_length(btrim(name)) between 2 and 100
    and attendance in ('Hadir', 'Tidak Hadir', 'Masih Ragu')
    and (message is null or char_length(message) <= 1000)
    and (
      (attendance = 'Hadir' and guests is not null and guests between 1 and 5)
      or (attendance <> 'Hadir' and guests is null)
    )
  );
drop policy if exists "Guests can read public wishes" on public.guestbook;
create policy "Guests can read public wishes" on public.guestbook
  for select to anon using (message is not null);

-- Public reading is limited to the fields actually shown in the guestbook.
revoke all on public.guestbook from anon;
grant insert (name, attendance, guests, message) on public.guestbook to anon;
grant select (id, created_at, name, message) on public.guestbook to anon;

commit;
