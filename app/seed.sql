do $$ begin
    create type organization_role as enum (
        'owner',
        'member'
    );
exception
    when duplicate_object then null;
end $$;

do $$ begin
    create type tournament_visibility as enum (
        'public',
        'unlisted',
        'private'
    );
exception
    when duplicate_object then null;
end $$;

do $$ begin
    create type tournament_role as enum (
        'convenor',
        'tabulator',
        'chief adjudicator',
        'debater',
        'adjudicator'
    );
exception
    when duplicate_object then null;
end $$;

create table if not exists users (
    user_id serial primary key,
    name varchar(255) not null,
    email varchar(255) unique not null,
    password varchar(255) not null,
    created_at timestamp with time zone default current_timestamp
);

create table if not exists organizations (
    organization_id serial primary key,
    name varchar(255) not null,
    created_at timestamp with time zone default current_timestamp
);

create table if not exists organization_users (
    organization_id serial references organizations,
    user_id serial references users,
    role organization_role not null,
    created_at timestamp with time zone default current_timestamp,
    primary key (organization_id, user_id)
);

create table if not exists tournaments (
    tournament_id serial primary key,
    organization_id serial references organizations not null,
    name varchar(255) not null,
    tab_link text,
    visibility tournament_visibility not null,
    start_time timestamp with time zone not null,
    created_at timestamp with time zone default current_timestamp
);

create table if not exists tournament_users (
    tournament_id serial references tournaments,
    user_id serial references users,
    role tournament_role not null,
    created_at timestamp with time zone default current_timestamp,
    primary key (tournament_id, user_id)
);
