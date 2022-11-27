drop schema if exists library_management;
create schema library_management;
use library_management;

drop table if exists role;
create table role(
                     id bigint not null primary key auto_increment,
                     code varchar(255) not null,
                     name varchar(255) not null,
                     created_date timestamp null,
                     created_by bigint null,
                     modified_date timestamp null,
                     modified_by bigint null,
                     deleted bool null
);

drop table if exists user;
create table user (
                      id bigint not null primary key auto_increment,
                      code varchar(255) not null,
                      username varchar(255) not null unique,
                      password varchar(255) not null,
                      fullname varchar(255) not null,
                      email varchar(255) not null unique,
                      role_id bigint null,
                      created_date timestamp null,
                      created_by bigint null,
                      modified_date timestamp null,
                      modified_by bigint null,
                      deleted bool null
);

alter table user add constraint fk_user_role foreign key(role_id) references role(id);


