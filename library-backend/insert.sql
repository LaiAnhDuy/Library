use library_management;

-- insert role
insert into role(name, code) values("admin", "admin");
insert into role(name, code) values("user", "user");

-- insert user
insert into user(code, username, password, fullname, email, role_id, deleted)
values("admin", "admin", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6", "Admin", "admin@gmail.com", 1, false);

insert into user(code, username, password, fullname, email, role_id, deleted)
values("duongnv", "duongnv", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6", "Nguyễn Văn Đương", "duong.nv194260@sis.hust.edu.vn", 1, false);
