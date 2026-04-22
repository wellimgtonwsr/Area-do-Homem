-- =============================================
-- ÁREA DO HOMEM — Setup Supabase
-- Cole e execute no SQL Editor do Supabase
-- =============================================

-- 1. TABELA DE PRODUTOS
create table if not exists products (
  id          text primary key,
  name        text not null,
  link        text not null,
  price       numeric not null,
  old_price   numeric,
  category    text default 'tecnologia',
  store       text,
  rating      numeric,
  rcount      integer,
  img         text,
  badge       text,
  created_at  timestamptz default now()
);

-- 2. TABELA DE MENSAGENS DO CHAT
create table if not exists chat_messages (
  id          bigserial primary key,
  username    text not null,
  text        text not null,
  created_at  timestamptz default now()
);

-- 3. TABELA DE ACESSO AO CHAT (emails que pagaram)
create table if not exists chat_access (
  id          bigserial primary key,
  email       text unique not null,
  payment_id  text,
  paid_at     timestamptz default now()
);

-- =============================================
-- PERMISSÕES (RLS)
-- =============================================

-- Habilitar RLS nas tabelas
alter table products      enable row level security;
alter table chat_messages enable row level security;
alter table chat_access   enable row level security;

-- PRODUCTS: qualquer um pode ler, só service_role pode escrever
create policy "products_read_all"   on products      for select using (true);
create policy "products_write_auth" on products      for all    using (true) with check (true);

-- CHAT_MESSAGES: qualquer um pode ler e inserir (validado pelo backend)
create policy "messages_read_all"   on chat_messages for select using (true);
create policy "messages_insert_all" on chat_messages for insert with check (true);

-- CHAT_ACCESS: só o backend lê/escreve (service_role bypassa RLS)
create policy "access_read_all"     on chat_access   for select using (true);
create policy "access_insert_all"   on chat_access   for insert with check (true);

-- =============================================
-- REALTIME (habilitar para chat ao vivo)
-- =============================================
alter publication supabase_realtime add table chat_messages;
