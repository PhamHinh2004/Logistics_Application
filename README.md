# 🚛 TMS — Transportation Management System

A microservices-based Transportation Management System built with **Spring Boot (Java)** and **ASP.NET Core (.NET)**, demonstrating real-world dual-stack architecture.

---

## 📌 Overview

TMS is a logistics platform that manages the full lifecycle of freight transportation — from customer inquiry and quotation to order dispatching, driver tracking, and delivery confirmation.

> **Why two stacks?** Spring Boot handles complex business logic and event-driven workflows. ASP.NET Core powers realtime tracking via SignalR and fast reporting. Each framework is used where it genuinely excels.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│              Client Layer                        │
│      React Web Admin    React Native (Driver)    │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────┐
│           API Gateway (Spring Cloud Gateway)     │
│         Routing · Auth Filter · Rate Limit       │
└──────┬──────────────────────────┬───────────────┘
       │                          │
┌──────▼──────────┐    ┌──────────▼──────────────┐
│  Spring Boot    │    │     ASP.NET Core         │
│  (Java)         │    │     (.NET 8)             │
│                 │    │                          │
│ • Auth Service  │    │ • Fleet Service          │
│ • CRM Service   │    │ • Tracking Service       │
│ • Order Service │    │ • Report Service         │
│ • Dispatch Svc  │    │                          │
└──────┬──────────┘    └──────────┬───────────────┘
       │                          │
       └──────────┬───────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│                Message Bus                       │
│                 RabbitMQ                         │
└─────────────────────────────────────────────────┘
       │              │              │
┌──────▼──┐    ┌──────▼──┐   ┌──────▼──┐
│PostgreSQL│   │ MongoDB  │   │  Redis  │
│(business)│   │(GPS logs)│   │(cache + │
│          │   │          │   │ queue)  │
└──────────┘   └──────────┘   └─────────┘
```

---

## 🧩 Services

### Spring Boot — Business Core

| Service | Port | Responsibility |
|---|---|---|
| `api-gateway` | 8080 | Routing, auth filter, rate limiting |
| `auth-service` | 8081 | JWT, Spring Security, 4 roles |
| `crm-service` | 8082 | Customer lifecycle, pricing engine, quotations |
| `order-service` | 8083 | Order state machine (7 states), Spring State Machine |
| `dispatch-service` | 8084 | Trip assignment, AI suggestion, RabbitMQ events |

### ASP.NET Core — Realtime & Reporting

| Service | Port | Responsibility |
|---|---|---|
| `fleet-service` | 8085 | Vehicle & driver CRUD, EF Core Minimal API |
| `tracking-service` | 8086 | GPS realtime via SignalR, POD upload |
| `report-service` | 8087 | Dashboard, Excel export via ClosedXML |

---

## 🔄 Customer Journey

```
Customer inquiry
      ↓
Sales creates profile (NEW → IN_PROGRESS → OFFICIAL)
      ↓
Quotation (auto-calculated: weight × distance × cargo type)
      ↓
Order created (PENDING → CONFIRMED)
      ↓
Dispatcher assigns vehicle + driver (DISPATCHED)
      ↓
Driver accepts on mobile app (PICKING_UP → IN_TRANSIT)
      ↓
Realtime GPS tracking via SignalR
      ↓
Delivery confirmed + POD photo (DELIVERED)
      ↓
Customer notified via SMS/email
```

---

## 🛠️ Tech Stack

### Backend
| | Technology |
|---|---|
| Java framework | Spring Boot 3.x |
| .NET framework | ASP.NET Core 8 (Minimal API) |
| API Gateway | Spring Cloud Gateway |
| ORM (Java) | Spring Data JPA + Hibernate |
| ORM (.NET) | Entity Framework Core 8 |
| State machine | Spring State Machine |
| Message broker | RabbitMQ |
| Realtime | SignalR (ASP.NET Core) |
| Auth | Spring Security + JWT (RS256) |

### Database
| Database | Used by | Reason |
|---|---|---|
| PostgreSQL | Auth, CRM, Order, Dispatch, Fleet | ACID, relational, stable schema |
| MongoDB | Tracking Service | High write throughput for GPS time-series |
| Redis | Dispatch (cache) + Notification (queue) | Fast cache + async job queue |

### Frontend
| | Technology |
|---|---|
| Web Admin | React + TypeScript + TailwindCSS |
| Driver App | React Native (Expo) |
| API Client | Axios + React Query |
| Realtime | Socket.IO / SignalR client |

### DevOps
| | Technology |
|---|---|
| Containerization | Docker + Docker Compose |
| API Docs | Swagger / OpenAPI (each service) |
| CI | GitHub Actions |

---

## 🗃️ Database Schema (Overview)

```
users ──────────────────────────── 1:1 ── drivers
  │                                           │
  │ (sales_owner)                             │
  ▼                                           │
customers ── 1:N ── quotations               │
                         │                    │
                         │ 1:N               │
                         ▼                    │
                      orders ── 1:1 ── trips ─┘
                         │              │
                         │              ├── trip_tracking_logs (MongoDB)
                         │              ├── trip_expenses
                         │              └── delivery_proofs
                         │
                    order_status_logs (audit trail)
```

---

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Java 21+
- .NET 8 SDK
- Node.js 20+

### Run with Docker Compose

```bash
# Clone the repo
git clone https://github.com/yourusername/tms-system.git
cd tms-system

# Start all infrastructure (DB + broker)
docker compose up -d postgres mongodb redis rabbitmq

# Start all services
docker compose up -d

# Check all services running
docker compose ps
```

### Access Points

| URL | Description |
|---|---|
| `http://localhost:8080` | API Gateway |
| `http://localhost:8080/swagger` | Aggregated API docs |
| `http://localhost:3000` | React Web Admin |
| `http://localhost:15672` | RabbitMQ Management UI |

---

## 📁 Project Structure

```
tms-system/
│
├── spring-services/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── crm-service/
│   ├── order-service/
│   └── dispatch-service/
│
├── dotnet-services/
│   ├── FleetService/
│   ├── TrackingService/
│   └── ReportService/
│
├── frontend/
│   ├── web-admin/          # React
│   └── driver-app/         # React Native
│
├── docker-compose.yml
├── docker-compose.dev.yml
└── docs/
    ├── architecture.md
    ├── api-contracts.md
    └── db-schema.sql
```

---

## 🔐 Authentication & Roles

JWT-based auth via Spring Security. Token issued by `auth-service`, validated at API Gateway level.

| Role | Access |
|---|---|
| `ADMIN` | Full system access |
| `SALES` | Customer, quotation, order management |
| `DISPATCHER` | Dispatch, vehicle, driver assignment |
| `DRIVER` | Mobile app — own trips only |

---

## 📡 Event Flow (RabbitMQ)

```
order-service          →  ORDER_CONFIRMED     →  dispatch-service
dispatch-service       →  TRIP_ASSIGNED       →  notification-service
tracking-service       →  STATUS_UPDATED      →  order-service
tracking-service       →  ORDER_DELIVERED     →  notification-service
notification-service   →  sends SMS/email     →  customer
```

---

## 📊 Key Design Decisions

**Why Spring State Machine for orders?**
Order has 7 states with strict transition rules. Spring State Machine enforces valid transitions and fires events automatically — preventing invalid state changes at the framework level.

**Why SignalR for tracking instead of Spring WebSocket?**
SignalR (ASP.NET Core) provides automatic transport fallback (WebSocket → SSE → Long Polling), built-in group management for broadcasting to specific trips, and tight .NET integration — requiring significantly less configuration than Spring WebSocket.

**Why MongoDB for GPS logs?**
GPS data is append-only time-series — hundreds of inserts per minute per vehicle, never updated. MongoDB's write throughput and TTL indexes (auto-delete logs older than 30 days) make it the right tool here.

---

## 🗺️ Roadmap

- [x] System design & database schema
- [ ] Auth Service (JWT + refresh token)
- [ ] CRM Service (customer lifecycle)
- [ ] Order Service (state machine)
- [ ] Dispatch Service (trip assignment)
- [ ] Fleet Service (ASP.NET Core)
- [ ] Tracking Service (SignalR + MongoDB)
- [ ] Report Service (Excel export)
- [ ] React Web Admin
- [ ] React Native Driver App
- [ ] Docker Compose full setup
- [ ] CI/CD with GitHub Actions

---

## 👤 Author

**[Your Name]**
- GitHub: [[@PhamHinh2004](https://github.com/PhamHinh2004)
- LinkedIn: (https://www.linkedin.com/in/hinh-ph%E1%BA%A1m-517a8627b)

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
