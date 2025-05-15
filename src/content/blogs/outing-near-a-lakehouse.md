---
title: Outing near a lakehouse 
date: 2025-05-13
description: what I learned about Datawarehouses, Delta-lakes and Lakehouses 
visible: false
tags: Database, blog
---
This sunday there was an interesting meetup organized by `e6data(https://www.e6data.com/)`, called Lakehouse days(https://lu.ma/m593968s?tk=5dBS7S).
Theme for this week was around `Apache Iceberg` before coming to this meetup, I had only heard of `Datawarehouses`, `Delta lakes` and `Lakehouses` courtesy reading some parts of `Apache Iceberg: The definitive Guide`(https://www.amazon.in/Apache-Iceberg-Functionality-Performance-Scalability/dp/1098148622).
I went in with an open mind, to learn more about this ecosystem, to really understand how those terms are defined and used in Industry.
First talk was titled `Design a lakehouse brick by brick using pyarrow, pyberg & DuckDB`

It was pretty interesting, really cleared up a lot of things for me before jumping into details of DWH, Delta Lake & Lakehouse, I would like to talk about Data platforms.

Data platforms consist of following:
- Storage (Cloud/Disk)
- File formats (Parquet, Avro, ORC)
- Table format (Apache Iceberg)
- Storage engine
- Compute engine (e6data is one example) 
- Catalog 

### **Storage**
It is basically where your data resides, it can be in a disk or in object storage.

### **File formats**
These are formats in which data are stored, storing data the way it is received will be very space inefficient and will be difficult
in certain operations.

### **Table formats**
These are formats to make your data files queryable with some language, it can be SQL or something else, Apache Hive was the first
to provide one interface on top of HDFS(Hadoop File System).

### **Storage engine**
These are what controls the flow of data, like which page to put data into and how to store, everything is handled by these, they are an abstraction over filesystem.

### **Compute engine**
Processing data files & table formats is done with the help of compute engine, some famous ones are like `Apache Spark`, `DuckDB`, `Apache Flink` and many more.

### **Catalog**
Storing metadata about different components of your data and 

Datawarehouses, Delta Lakes & Lakehouses all have these components, difference lies in how these components are assembled.

In a Datawarehouse, data is pretty structured and all the components are well packaged into one software component. As a user you
are stuck with one solution and if you want to try some new File format or add a new table format to your data, you will have to
switch your DB, Another issue with DWH is that they are not good in storing unstructured data, in production systems, there is 
always an ETL(Extract-Transform-Load) step before data is added into these DBs.

Delta Lakes provide one step better clarity and support unstructured or semi-structured data but they also lack the modularity 
