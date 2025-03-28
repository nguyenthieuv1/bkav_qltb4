--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.6

-- Started on 2025-03-09 10:26:51

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

-- DROP DATABASE IF EXISTS quan_ly_thiet_bi_1;
--
-- TOC entry 4865 (class 1262 OID 16475)
-- Name: quan_ly_thiet_bi; Type: DATABASE; Schema: -; Owner: postgres
--

-- CREATE DATABASE quan_ly_thiet_bi_1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Vietnamese_Vietnam.1252';
--
--
-- ALTER DATABASE quan_ly_thiet_bi OWNER TO postgres;


--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

-- CREATE SCHEMA public;
--
--
-- ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4866 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

-- COMMENT ON SCHEMA public IS 'standard public schema';


-- SET default_tablespace = '';

-- SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16477)
-- Name: tbl_account; Type: TABLE; Schema: public; Owner: postgres
--

-- CREATE TABLE public.tbl_account (
--                                     id bigint NOT NULL,
--                                     address character varying(255),
--                                     full_name character varying(255),
--                                     password character varying(255),
--                                     phone character varying(255),
--                                     role character varying(255),
--                                     username character varying(255)
-- );


-- ALTER TABLE public.tbl_account OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16485)
-- Name: tbl_category; Type: TABLE; Schema: public; Owner: postgres
--

-- CREATE TABLE public.tbl_category (
--                                      id bigint NOT NULL,
--                                      name character varying(255),
--                                      note character varying(255)
-- );


-- ALTER TABLE public.tbl_category OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16493)
-- Name: tbl_device; Type: TABLE; Schema: public; Owner: postgres
--

-- CREATE TABLE public.tbl_device (
--                                    id bigint NOT NULL,
--                                    description character varying(255),
--                                    name character varying(255),
--                                    note character varying(255),
--                                    status character varying(255),
--                                    account_id bigint,
--                                    category_id bigint
-- );


-- ALTER TABLE public.tbl_device OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16510)
-- Name: category_emphoyee; Type: VIEW; Schema: public; Owner: postgres
--

DROP VIEW IF EXISTS public.category_employee;
CREATE VIEW public.category_employee AS
SELECT
    ac.full_name AS accountname,
    ca.name AS categoryname,
    de.description
FROM public.tbl_device de
         JOIN public.tbl_category ca ON de.category_id = ca.id
         JOIN public.tbl_account ac ON de.account_id = ac.id;




-- ALTER VIEW public.category_emphoyee OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16476)
-- Name: tbl_account_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

-- ALTER TABLE public.tbl_account ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
--     SEQUENCE NAME public.tbl_account_id_seq
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1
--     );


--
-- TOC entry 217 (class 1259 OID 16484)
-- Name: tbl_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

-- ALTER TABLE public.tbl_category ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
--     SEQUENCE NAME public.tbl_category_id_seq
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1
--     );


--
-- TOC entry 219 (class 1259 OID 16492)
-- Name: tbl_device_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

-- ALTER TABLE public.tbl_device ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
--     SEQUENCE NAME public.tbl_device_id_seq
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1
--     );


--
-- TOC entry 4855 (class 0 OID 16477)
-- Dependencies: 216
-- Data for Name: tbl_account; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- INSERT INTO public.tbl_account VALUES (25, 'Hà Nội', 'Nguyễn Văn C', '$2a$10$GbCWGv1zl/me1zYt2YUWqun9xLGH2uICo7rUsXZA/I2FcUaKwppXy', '0123789789', 'USER', 'user1001');
-- INSERT INTO public.tbl_account VALUES (27, 'scdcxc', 'vcasxcsdc', '$2a$10$3OlfL/PNN5od1nW264O1suJeNuTjtctoJD5aaUpgGR.ajTpmdIkzK', '324353', 'USER', 'b');
-- INSERT INTO public.tbl_account VALUES (100, 'Hà Nội', 'Nguyễn Văn A', '$2a$10$n/Wzv5THZuDyaLuGTgSl9uxioJulemUOd33u4eCpzXh0JVGENRjRW', '035812312356', 'ADMIN', 'admin');
-- INSERT INTO public.tbl_account VALUES (7, 'Hà Nội', 'Nguyễn Văn C', '$2a$10$m0PYagilcoeUyHcuFD3mTOHn2G1DEIoUkI4AKHfYbP3QtSIQfnYsK', '0123789789', 'USER', 'user1');
-- INSERT INTO public.tbl_account VALUES (17, 'Hà Nội', 'Nguyễn Văn C', '$2a$10$.R21emlpcCWH9bYVGZ9iguh4SrPVMFHuAN4TD0a/pUs1Wk8eCv8Xi', '0123789789', 'USER', 'user100');
-- INSERT INTO public.tbl_account VALUES (8, 'Hà Nội', 'Nguyễn Văn C', '$2a$10$bUFtpaxkJs8H2O2YOOeb4.GvwBVx6eSuyGVJzIQZ8bRFWDV0jDUwO', '0123789789', 'USER', 'user2');
-- INSERT INTO public.tbl_account VALUES (13, 'Hà Nội', 'Nguyễn Văn C', '$2a$10$U201GKkdopwWflQyP0uYE.0pO5Msts1H.Qe63zHT1jGZUqNIdxjxu', '0123789789', 'USER', 'user5');
-- INSERT INTO public.tbl_account VALUES (30, 'Hà Nội', 'Nguyễn Văn C', '$2a$10$FKO2P7.2CfmjJYPWJrauX.GsZRUUD40.iW0PfsRGDrmvR5Q950HWu', '0123789789', 'USER', 'user1234');
-- INSERT INTO public.tbl_account VALUES (14, 'Hà Nội', 'Nguyễn Văn CA aaa', '$2a$10$e4j8Sau5VCIUYQowNhskjuLt0oPFhxnz3A0n6cVPdNgxTmNy8Wi.6', '0123789789', 'ADMIN', 'user1000');
-- INSERT INTO public.tbl_account VALUES (18, 'Hà Nội', 'Nguyễn Văn C', '$2a$10$Za4RTHFWEDr8jgmgXsNTdeQxjTMi9eJA2WhjgGkHoBkDqPuItG/Tu', '0123789789', 'USER', 'user101');
-- INSERT INTO public.tbl_account VALUES (19, 'Hà Nội', 'Nguyễn Văn C', '$2a$10$KjrghPL4grFgZnR5beeDWuWvfpMh9KAMGLrsyzJvdO4WRzj9FpoFG', '0123789789', 'USER', 'user102');
-- INSERT INTO public.tbl_account VALUES (31, 'dsvs', 'dsscdvfdavd', '$2a$10$v5Yy4Cg3c/hQkAEbVQMJIezeyspKBqwEDDF/R/oQ7HA/IgTrrtVXG', '143242532', 'USER', 'user1');
-- INSERT INTO public.tbl_account VALUES (32, 'fvadfbdzb', 'dafvsfds', '$2a$10$yqrt4JPV3fHyqJu.fI5SEe/QVAhyNTffeAiQrihQ3vTJE93e0dzyy', '434131232', 'USER', 'user2');
--
-- TOC entry 4857 (class 0 OID 16485)
-- Dependencies: 218
-- Data for Name: tbl_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- INSERT INTO public.tbl_category VALUES (1, 'đồ dùng cá nhân', 'sản phẩm tốt');
-- INSERT INTO public.tbl_category VALUES (2, 'thiết bị điện tử', 'sản phẩm tốt');


--
-- TOC entry 4859 (class 0 OID 16493)
-- Dependencies: 220
-- Data for Name: tbl_device; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- INSERT INTO public.tbl_device VALUES (15, 'máy đã hỏng', 'máy PC 999', 'ko có', '0', 100, 2);
-- INSERT INTO public.tbl_device VALUES (13, 'máy mới', 'máy PC 999', 'ko có', '0', 25, 1);
-- INSERT INTO public.tbl_device VALUES (14, 'máy mới', 'máy PC 999', 'ko có', '1', 100, 1);
-- INSERT INTO public.tbl_device VALUES (6, 'máy mới', 'máy PC 9999', 'ko có', '0', 100, 1);
-- INSERT INTO public.tbl_device VALUES (12, 'máy mới', 'máy PC 999', 'ko có', '0', 27, 1);
-- INSERT INTO public.tbl_device VALUES (25, 'sdvcdfv', 'cdscadsfv', 'sdvfdsv', '1', NULL, 2);
-- INSERT INTO public.tbl_device VALUES (26, 'sdvcdfv', 'cdscadsfv', 'sdvfdsv', '0', 25, 2);
-- INSERT INTO public.tbl_device VALUES (24, 'vfdv df adv', 'csDVadfv ', 'vdsvsfvfav', '0', 7, 2);
-- INSERT INTO public.tbl_device VALUES (2, 'hàng tốt', 'chuột máy tính', 'hàng cũ', '0', 101, 2);
-- INSERT INTO public.tbl_device VALUES (1, 'hàng cao cấp', 'chăn gối', 'còn mới', '1', NULL, 1);
-- INSERT INTO public.tbl_device VALUES (17, 'bbbbbbbbbbbbbbbbbbbb', 'laptop Dell', 'đsv', '0', 7, 2);


--
-- TOC entry 4867 (class 0 OID 0)
-- Dependencies: 215
-- Name: tbl_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

-- SELECT pg_catalog.setval('public.tbl_account_id_seq', 35, true);


--
-- TOC entry 4868 (class 0 OID 0)
-- Dependencies: 217
-- Name: tbl_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

-- SELECT pg_catalog.setval('public.tbl_category_id_seq', 1, false);


--
-- TOC entry 4869 (class 0 OID 0)
-- Dependencies: 219
-- Name: tbl_device_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

-- SELECT pg_catalog.setval('public.tbl_device_id_seq', 31, true);


--
-- TOC entry 4703 (class 2606 OID 16483)
-- Name: tbl_account tbl_account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public.tbl_account
--     ADD CONSTRAINT tbl_account_pkey PRIMARY KEY (id);


--
-- TOC entry 4705 (class 2606 OID 16491)
-- Name: tbl_category tbl_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public.tbl_category
--     ADD CONSTRAINT tbl_category_pkey PRIMARY KEY (id);


--
-- TOC entry 4707 (class 2606 OID 16499)
-- Name: tbl_device tbl_device_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public.tbl_device
--     ADD CONSTRAINT tbl_device_pkey PRIMARY KEY (id);


--
-- TOC entry 4708 (class 2606 OID 16500)
-- Name: tbl_device fkb0165058jsofg4l3bmtus7o6d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public.tbl_device
--     ADD CONSTRAINT fkb0165058jsofg4l3bmtus7o6d FOREIGN KEY (account_id) REFERENCES public.tbl_account(id);


--
-- TOC entry 4709 (class 2606 OID 16505)
-- Name: tbl_device fkc4o7osowsbsjr66781t34e6v4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

-- ALTER TABLE ONLY public.tbl_device
--     ADD CONSTRAINT fkc4o7osowsbsjr66781t34e6v4 FOREIGN KEY (category_id) REFERENCES public.tbl_category(id);


-- Completed on 2025-03-09 10:26:52

--
-- PostgreSQL database dump complete
--

