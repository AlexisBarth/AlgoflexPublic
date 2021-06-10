CREATE TABLE ROLE (
  rle_type VARCHAR(5) PRIMARY KEY NOT NULL,
  rle_description VARCHAR(20) NOT NULL
)
;
CREATE TABLE USERS
(
    id INT PRIMARY KEY NOT NULL,
    usr_firstname VARCHAR(20) NOT NULL,
    usr_lastname VARCHAR(20) NOT NULL,
    usr_password VARCHAR(20) NOT NULL,
    usr_mail VARCHAR(50) NOT NULL,
    usr_favorite_langage VARCHAR(20),
    usr_lastlogin DATE NOT NULL,
    usr_created_at DATE NOT NULL,
	rle_type VARCHAR(5) NOT NULL,
	CONSTRAINT fk_rle_type FOREIGN KEY (rle_type) REFERENCES ROLE (rle_type)
)
;
CREATE TABLE ROLE_RIGHT (
  id INT PRIMARY KEY NOT NULL,
  rle_type VARCHAR(5) NOT NULL,
  rler_description VARCHAR(20) NOT NULL
  CONSTRAINT fk_rleRight_type FOREIGN KEY (rle_type) REFERENCES ROLE (rle_type)
)
;
CREATE TABLE CPU (
  id INT PRIMARY KEY NOT NULL,
  CPU_cores INT NOT NULL,
  CPU_threads INT NOT NULL,
  CPU_frequency INT NOT NULL
)
;
CREATE TABLE RAM (
  id INT PRIMARY KEY NOT NULL,
  RAM_amount INT NOT NULL,
  RAM_frequency INT NOT NULL
)
;
CREATE TABLE CONFIG_LEVEL (
  conf_number INT PRIMARY KEY NOT NULL,
  conf_description VARCHAR(20) NOT NULL,
  CPU_id INT NOT NULL,
  RAM_id INT NOT NULL,
  CONSTRAINT fk_CPU_id FOREIGN KEY (CPU_id) REFERENCES CPU (id),
  CONSTRAINT fk_RAM_id FOREIGN KEY (RAM_id) REFERENCES RAM (id)
)
;
CREATE TABLE THEME (
  thm_type VARCHAR(5) PRIMARY KEY NOT NULL,
  thm_name VARCHAR(20) NOT NULL,
)
;
CREATE TABLE EXERCICE (
  exo_number INT PRIMARY KEY NOT NULL,
  exo_description VARCHAR(20) NOT NULL,
  thm_type VARCHAR(5) NOT NULL,
  conf_number INT NOT NULL
  CONSTRAINT fk_exo_thm_type FOREIGN KEY (thm_type) REFERENCES THEME (thm_type),
  CONSTRAINT fk_conf_number FOREIGN KEY (conf_number) REFERENCES CONFIG_LEVEL (conf_number)
)
;
CREATE TABLE THEME_CHOICE (
  id INT PRIMARY KEY NOT NULL,
  users_id INT NOT NULL,
  thm_type VARCHAR(5) NOT NULL,
  CONSTRAINT fk_users_id FOREIGN KEY (users_id) REFERENCES USERS (id),
  CONSTRAINT fk_tc_thm_type FOREIGN KEY (thm_type) REFERENCES THEME (thm_type)
)
;
CREATE TABLE EXERCICE_DONE (
  id INT PRIMARY KEY NOT NULL,
  exod_done BIT NOT NULL,
  users_id INT NOT NULL,
  exo_number INT NOT NULL,
  CONSTRAINT fk_ed_users_id FOREIGN KEY (users_id) REFERENCES USERS (id),
  CONSTRAINT fk_exo_conf_number FOREIGN KEY (exo_number) REFERENCES EXERCICE (exo_number)
)
;