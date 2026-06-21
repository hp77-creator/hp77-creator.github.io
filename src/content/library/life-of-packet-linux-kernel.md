---
title: Life of a packet in linux kernel 
type: book
status: reading
authors: Martin Kleppmann
year: 2017
url: https://dataintensive.net/
description: The big ideas behind reliable, scalable, and maintainable systems
tags: databases, distributed-systems, architecture
visible: false
---

```mermaid
sequenceDiagram

participant App as Application (User Space)

participant Socket as Socket Layer

participant Transport as Transport Layer (TCP/UDP)

participant IP as IP Layer

participant Eth as Ethernet Layer

participant NIC as Network Interface Card
App→>>Socket: write() / sendto()
Socket->>Socket: sock_sendmsg() (Checks permissions via Security Modules)
Socket→>>Transport: INDIRECT_CALL_INET
note over Transport: Builds Transport Header & Enqueues to Write Queue
Transport->> Transport: tcp_sendmsg() / udp_sendmsg()
Transport->>Transport: tcp_transmit_skb()
Transport→>>IP: queue_xmit()
note over IP: Routing, IP Header, Netfilter, Fragmentation IP→>>IP: _ip_queue_xmit() & ip_options_build()
IP->>IP: ip_output() & ip_finish_output()
IP->>IP: neigh_resolve_output() (Resolves MAC via ARP)
IP->>Eth: dev_queue_xmit()
note over Eth: Queuing discipline (qdisc) & Post-processing
Eth→>>Eth: tc_egress() & _qdisc_run()
Eth->>Eth: validate_xmit_skb() (Calculates Checksum/VLAN)
Eth->>NIC: ndo_start_xmit() (Maps DMA & Writes to TX Ring)
```