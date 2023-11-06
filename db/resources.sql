create table countries(
	id varchar(45) primary key,
    country varchar(50) not null,
    abbreviation varchar(3) not null,
    flag_img mediumblob null,
    created_by varchar(25) not null,
    created_at datetime not null,
    modified_by varchar(25) null,
    modified_at datetime null,
    enabled boolean default true
);

create table provinces(
	id varchar(45) primary key,
    province varchar(50) not null,
    id_country varchar(50) not null,
    created_by varchar(25) not null,
    created_at datetime not null,
    modified_by varchar(25) null,
	modified_at datetime null,
    enabled boolean default true,
    key province_country (id_country)
);

create table cities(
	id varchar(45) primary key,
    city varchar(50) not null,
    id_province varchar(50) not null,
    created_by varchar(25) not null,
    created_at datetime not null,
    modified_by varchar(25) null,
	modified_at datetime null,
    enabled boolean default true,
    key cities_province (id_province)
);

create table documents(
	id varchar(45) primary key,
    document varchar(50) not null,
    parttern varchar(150) null,
    id_country varchar(50) not null,
    created_by varchar(25) not null,
    created_at datetime not null,
    modified_by varchar(25) null,
	modified_at datetime null,
    enabled boolean default true,
    key document_country (id_country)
);

create table communication_channels(
	id varchar(45) primary key,
    channel varchar(50) not null,
    parttern varchar(150) null,
    created_by varchar(25) not null,
    created_at datetime not null,
    modified_by varchar(25) null,
	modified_at datetime null,
    enabled boolean default true
);

create table people(
	id varchar(45) primary key,
    names varchar(150) not null,
    surnames varchar(150) not null,
    id_country varchar(50) not null,
    date_of_birth date not null,
    created_by varchar(25) not null,
    created_at datetime not null,
    modified_by varchar(25) null,
	modified_at datetime null,
    enabled boolean default true,
    key nationality (id_country)
);