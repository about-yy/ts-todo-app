create table task (
    id SERIAL constraint task_pk primary key,
    name text,
    status int,
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
);