-- Create images table to store uploaded images as base64
-- Run this in your Supabase SQL editor or include in migration pipeline

create extension if not exists pgcrypto;

create table if not exists images (
  id uuid primary key default gen_random_uuid(),
  filename text unique not null,
  mime text,
  base64_data text not null,
  created_at timestamptz default now()
);

create index if not exists idx_images_filename on images(filename);
