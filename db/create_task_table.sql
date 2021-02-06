create table task (
    id SERIAL,
    title text,
    status int,
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
);