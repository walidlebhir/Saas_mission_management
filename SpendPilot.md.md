# MISSIONX
## Plateforme SaaS de Gestion des Dépenses de Mission

**Cahier des Charges • Use Cases • Base de Données • Architecture Technique**

- **Version :** 1.1.0 (édition Noir & Blanc — Backend NestJS)
- **Date :** Juillet 2026
- **Stack :** NestJS / Next.js / React Native
- **Statut :** Confidentiel

MissionX © 2026 — Confidentiel

---

## Table des Matières

1. [Présentation du Projet](#1-présentation-du-projet)
2. [Acteurs du Système](#2-acteurs-du-système)
3. [Cas d'Utilisation (Use Cases)](#3-cas-dutilisation-use-cases)
4. [Fonctionnalités Avancées](#4-fonctionnalités-avancées)
5. [Conception de la Base de Données](#5-conception-de-la-base-de-données)
6. [Architecture Technique](#6-architecture-technique)
7. [Sécurité](#7-sécurité)
8. [Plans Tarifaires SaaS](#8-plans-tarifaires-saas)
9. [Roadmap de Développement](#9-roadmap-de-développement)
10. [Glossaire](#10-glossaire)

---

## 1. Présentation du Projet

MissionX est une application SaaS (Software as a Service) destinée aux entreprises souhaitant digitaliser et centraliser la gestion des dépenses liées aux missions professionnelles de leurs employés. La plateforme répond à un besoin concret : éliminer les processus manuels (feuilles Excel, reçus papier, validations par email) et offrir une visibilité en temps réel sur les coûts de déplacement.

### 1.1 Objectifs Principaux

- Permettre aux employés d'ajouter et de soumettre leurs dépenses de mission facilement
- Offrir au service financier un tableau de bord complet pour suivre, valider et analyser les dépenses
- Générer des rapports automatiques par mission, par employé ou par période
- Réduire les erreurs et les délais dans le processus de remboursement
- Assurer une traçabilité complète avec justificatifs numériques (photos de reçus)

### 1.2 Périmètre Fonctionnel

| Module | Description |
|---|---|
| Gestion des missions | Création, assignation et suivi des missions par le financier |
| Gestion des comptes | Création de comptes employés avec invitation par email |
| Dépenses | Saisie, catégorisation et upload de justificatifs par l'employé |
| Validation | Workflow d'approbation par le financier avec commentaires |
| Dashboard Finance | Vue consolidée, alertes budget, statistiques en temps réel |
| Remboursement | Suivi du statut de remboursement et export comptable |
| Rapports | Export PDF/Excel par mission, employé ou période |
| Notifications | Emails et notifications push (mobile) à chaque étape |
| Application Mobile | Version React Native pour iOS et Android |

---

## 2. Acteurs du Système

Le système MissionX implique quatre types d'acteurs principaux, chacun avec des droits et responsabilités bien définis.

| Acteur | Rôle | Accès |
|---|---|---|
| **Super Admin** | Gère la plateforme SaaS, crée les entreprises clientes | Accès total à toutes les organisations |
| **Financier / Manager** | Gère les missions, comptes et validations pour son entreprise | Accès complet à son organisation |
| **Employé / Commercial** | Consulte ses missions et soumet ses dépenses | Accès restreint à ses propres missions |
| **Approbateur N+1** | Valide en premier niveau avant le financier (optionnel) | Accès aux dépenses de son équipe |

---

## 3. Cas d'Utilisation (Use Cases)

### 3.1 Use Cases — Financier / Manager

#### UC-F01 — Créer une Mission

- **Acteur principal :** Financier
- **Précondition :** Le financier est connecté à la plateforme
- **Déclencheur :** Le financier clique sur « Nouvelle Mission »

**Scénario :**
1. Le financier accède au module « Missions » depuis son tableau de bord
2. Il clique sur « + Nouvelle Mission »
3. Il renseigne : nom de la mission, destination, dates de début et de fin, budget alloué, catégories de dépenses autorisées, description optionnelle
4. Il sélectionne les employés assignés à cette mission
5. Il valide la création
6. Le système enregistre la mission et envoie une notification email à chaque employé assigné

**Résultat attendu :** La mission est créée et visible dans le tableau de bord. Les employés reçoivent un email les informant de leur assignation.

#### UC-F02 — Créer un Compte Employé

- **Acteur principal :** Financier
- **Précondition :** Le financier est authentifié
- **Déclencheur :** Le financier souhaite ajouter un nouvel employé

**Scénario :**
1. Le financier va dans « Gestion des Employés »
2. Il clique sur « + Ajouter un employé »
3. Il saisit : nom complet, adresse email professionnelle, poste/département, manager direct (optionnel), plafond de dépenses mensuel
4. Il clique sur « Envoyer l'invitation »
5. Le système génère un token unique d'activation et envoie un email à l'employé avec un lien d'activation (valable 72h)
6. L'employé clique sur le lien, définit son mot de passe et accède à son espace

**Extensions :** Si l'email est déjà utilisé, le système affiche une erreur. Si le lien expire, le financier peut renvoyer une invitation.

#### UC-F03 — Valider ou Refuser une Dépense

- **Acteur principal :** Financier
- **Précondition :** Des dépenses en statut « En attente » existent
- **Déclencheur :** Le financier accuse réception d'une notification ou consulte le dashboard

**Scénario :**
1. Le financier voit la liste des dépenses en attente sur son dashboard
2. Il clique sur une dépense pour voir le détail : montant, catégorie, date, description, justificatif (photo du reçu)
3. Il peut zoomer sur le justificatif, voir la mission associée et le total déjà engagé
4. **Scénario A — Validation :** il clique « Valider ». Le statut passe à « Validé ». Une notification est envoyée à l'employé.
5. **Scénario B — Refus :** il clique « Refuser », saisit un motif obligatoire, confirme. Le statut passe à « Refusé » avec le motif visible pour l'employé.
6. **Scénario C — Demande d'informations :** il clique « Demander plus d'infos » et envoie un message à l'employé. La dépense reste en attente.

#### UC-F04 — Consulter le Tableau de Bord Financier

1. Le financier se connecte et accède automatiquement au dashboard principal
2. Il visualise : total des dépenses du mois en cours, nombre de missions actives, dépenses en attente de validation, alertes de dépassement de budget, graphiques de répartition par catégorie et par employé
3. Il peut filtrer par période, par employé, par mission ou par statut
4. Il peut exporter un rapport PDF ou Excel de n'importe quelle vue filtrée

#### UC-F05 — Gérer les Plafonds et les Règles de Dépenses

1. Le financier accède aux « Paramètres »
2. Il définit des plafonds par catégorie (ex : Repas ≤ 150 MAD/jour, Hôtel ≤ 800 MAD/nuit)
3. Il configure des alertes automatiques en cas de dépassement
4. Il définit les catégories de dépenses autorisées globalement ou par type de mission

#### UC-F06 — Générer et Exporter un Rapport

1. Le financier va dans « Rapports »
2. Il sélectionne le type : par mission, par employé, par période, ou rapport global
3. Il choisit le format d'export : PDF (présentation) ou Excel (comptabilité)
4. Le système génère le rapport avec : liste détaillée des dépenses, totaux par catégorie, statuts de remboursement, graphiques récapitulatifs
5. Le rapport est téléchargé et/ou envoyé par email

#### UC-F07 — Marquer des Dépenses comme Remboursées

1. Après validation et paiement effectif, le financier sélectionne une ou plusieurs dépenses validées
2. Il clique sur « Marquer comme remboursé » et saisit la date de virement
3. Le statut passe à « Remboursé ». L'employé reçoit une notification de remboursement.

### 3.2 Use Cases — Employé / Commercial

#### UC-E01 — Activer son Compte et Se Connecter

1. L'employé reçoit un email d'invitation avec un lien unique
2. Il clique sur le lien et est redirigé vers la page d'activation
3. Il définit un mot de passe sécurisé (min. 8 caractères, 1 majuscule, 1 chiffre)
4. Son compte est activé. Il accède à son espace personnel.
5. Lors des connexions suivantes : email + mot de passe (option 2FA disponible)

#### UC-E02 — Consulter ses Missions Assignées

1. L'employé se connecte et voit la liste de ses missions actives sur son tableau de bord
2. Pour chaque mission : nom, destination, dates, budget alloué, total déjà saisi, statut
3. Il clique sur une mission pour voir le détail et l'historique de ses dépenses

#### UC-E03 — Ajouter une Dépense

- **Acteur principal :** Employé
- **Précondition :** L'employé est assigné à au moins une mission active
- **Déclencheur :** L'employé a effectué une dépense de mission

**Scénario :**
1. L'employé clique sur « + Ajouter une dépense »
2. Il sélectionne la mission concernée
3. Il choisit la catégorie : Transport, Hôtel, Repas, Carburant, Péage, Parking, Autre
4. Il saisit : montant, devise, date, description détaillée, note complémentaire (optionnel)
5. Il upload une photo du justificatif (reçu, facture) depuis son appareil ou sa galerie
6. Il soumet la dépense
7. Le système vérifie si le montant dépasse un plafond défini et affiche une alerte si nécessaire
8. La dépense est enregistrée en statut « En attente ». Le financier reçoit une notification.

#### UC-E04 — Modifier ou Supprimer une Dépense

1. L'employé peut modifier ou supprimer une dépense uniquement si elle est encore en statut « En attente »
2. Une fois validée ou refusée, la dépense ne peut plus être modifiée
3. En cas de refus avec demande de correction, l'employé peut soumettre une nouvelle dépense corrigée

#### UC-E05 — Suivre le Statut de ses Dépenses

1. Sur son dashboard, l'employé voit pour chaque dépense : statut (En attente / Validé / Refusé / Remboursé), date de traitement, motif en cas de refus
2. Il reçoit des notifications push (mobile) et email à chaque changement de statut

#### UC-E06 — Utiliser l'Application Mobile

1. L'employé télécharge l'application React Native depuis l'App Store ou Google Play
2. Il se connecte avec ses identifiants web
3. Il peut effectuer toutes les actions de la version web en mobilité
4. Fonctionnalité exclusive mobile : prise de photo directe du reçu avec l'appareil photo
5. Les notifications push arrivent en temps réel sur son téléphone

### 3.3 Use Cases — Super Admin

#### UC-A01 — Créer une Organisation (Entreprise Cliente)

1. Le super admin se connecte au backoffice d'administration
2. Il crée une nouvelle organisation : nom de l'entreprise, domaine email, plan tarifaire, nombre max d'employés, logo
3. Il crée le compte du financier principal (admin de l'organisation)
4. Le financier reçoit ses identifiants par email

#### UC-A02 — Gérer les Plans et la Facturation

1. Le super admin accède au module de facturation
2. Il configure les plans tarifaires (Starter, Pro, Enterprise) avec les limites associées
3. Il peut suspendre, mettre à niveau ou résilier un abonnement
4. Les factures sont générées automatiquement chaque mois

### 3.4 Use Cases — Approbateur N+1 (Manager Direct)

#### UC-M01 — Valider au Premier Niveau

1. Quand un employé de son équipe soumet une dépense, l'approbateur N+1 reçoit une notification
2. Il consulte la dépense et peut la valider ou la rejeter avant transmission au financier
3. Si validée par N+1, elle passe en attente de validation par le financier
4. Ce workflow N+1 est configurable par l'organisation (activé ou non)

---

## 4. Fonctionnalités Avancées

### 4.1 OCR Automatique des Justificatifs

L'application intègre une reconnaissance optique de caractères (OCR) via l'API Google Cloud Vision pour extraire automatiquement les informations d'un reçu photographié.

- Extraction automatique : montant total, date, nom du fournisseur
- Pré-remplissage du formulaire de dépense avec les données extraites
- L'employé peut corriger les champs avant soumission
- Réduction significative du temps de saisie (gain estimé : 70 %)

### 4.2 Système de Notifications

| Déclencheur | Destinataire | Canal |
|---|---|---|
| Nouvelle dépense soumise | Financier + N+1 | Email + Push |
| Dépense validée | Employé | Email + Push |
| Dépense refusée | Employé | Email + Push + SMS |
| Remboursement effectué | Employé | Email + Push |
| Budget mission à 80 % | Financier | Email + Push |
| Budget mission dépassé | Financier | Email + Push + SMS |
| Invitation employé | Nouvel employé | Email |
| Rappel dépense non soumise | Employé | Email |

### 4.3 Multi-Devises

- Saisie des dépenses dans n'importe quelle devise (MAD, EUR, USD, GBP, XOF…)
- Conversion automatique vers la devise de référence de l'organisation
- Taux de change mis à jour quotidiennement via l'API Open Exchange Rates
- Affichage du montant original et du montant converti dans les rapports

### 4.4 Gestion des Délégations

- Un employé peut déléguer la saisie de ses dépenses à un collègue (ex : assistant)
- Le délégataire peut saisir au nom d'un autre employé
- Toutes les actions de délégation sont tracées dans les logs

### 4.5 Avances sur Mission

- Le financier peut accorder une avance (acompte) sur le budget de mission
- L'avance est déduite automatiquement du total à rembourser
- Suivi du solde d'avance restant en temps réel

### 4.6 Intégration Comptable

- Export au format CSV compatible avec les logiciels comptables (Sage, QuickBooks, Ciel Compta)
- Codification par centre de coût configurable
- Génération d'OD (opérations diverses) prêtes à l'import

---

## 5. Conception de la Base de Données

La base de données est relationnelle (**PostgreSQL**). Voici le schéma complet avec toutes les tables, leurs champs, types et contraintes.

### 5.1 Schéma des Tables

#### Table : `organizations`

| Champ | Type | Contrainte | Description |
|---|---|---|---|
| id | UUID | PK, NOT NULL | Identifiant unique de l'organisation |
| name | VARCHAR(200) | NOT NULL | Nom de l'entreprise |
| slug | VARCHAR(100) | UNIQUE, NOT NULL | Identifiant URL unique |
| domain | VARCHAR(200) | | Domaine email de l'entreprise |
| logo_url | TEXT | | URL du logo hébergé |
| plan | ENUM | NOT NULL | Starter / Pro / Enterprise |
| max_employees | INTEGER | DEFAULT 10 | Limite d'employés selon le plan |
| currency | VARCHAR(3) | DEFAULT 'MAD' | Devise de référence |
| settings | JSONB | | Paramètres de l'organisation (JSON) |
| is_active | BOOLEAN | DEFAULT true | Statut d'abonnement |
| created_at | TIMESTAMP | DEFAULT NOW() | Date de création |
| updated_at | TIMESTAMP | DEFAULT NOW() | Dernière mise à jour |

#### Table : `users`

| Champ | Type | Contrainte | Description |
|---|---|---|---|
| id | UUID | PK, NOT NULL | Identifiant unique |
| organization_id | UUID | FK → organizations | Organisation d'appartenance |
| first_name | VARCHAR(100) | NOT NULL | Prénom |
| last_name | VARCHAR(100) | NOT NULL | Nom de famille |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Email professionnel |
| password_hash | TEXT | NOT NULL | Mot de passe haché (bcrypt) |
| role | ENUM | NOT NULL | super_admin / finance / employee / approver |
| department | VARCHAR(100) | | Département de l'employé |
| manager_id | UUID | FK → users | Manager direct (N+1) |
| monthly_limit | DECIMAL(10,2) | | Plafond mensuel de dépenses |
| avatar_url | TEXT | | Photo de profil |
| invite_token | TEXT | | Token d'invitation (temporaire) |
| invite_expires_at | TIMESTAMP | | Expiration du token |
| is_active | BOOLEAN | DEFAULT false | Activé après acceptation de l'invitation |
| two_fa_enabled | BOOLEAN | DEFAULT false | Authentification à deux facteurs |
| last_login_at | TIMESTAMP | | Dernière connexion |
| created_at | TIMESTAMP | DEFAULT NOW() | Date de création |
| updated_at | TIMESTAMP | DEFAULT NOW() | Dernière mise à jour |

#### Table : `missions`

| Champ | Type | Contrainte | Description |
|---|---|---|---|
| id | UUID | PK, NOT NULL | Identifiant unique de la mission |
| organization_id | UUID | FK → organizations | Organisation propriétaire |
| created_by | UUID | FK → users | Financier créateur |
| name | VARCHAR(300) | NOT NULL | Nom de la mission |
| description | TEXT | | Description détaillée |
| destination | VARCHAR(200) | NOT NULL | Ville / Pays de destination |
| start_date | DATE | NOT NULL | Date de début |
| end_date | DATE | NOT NULL | Date de fin |
| budget | DECIMAL(12,2) | NOT NULL | Budget total alloué |
| currency | VARCHAR(3) | DEFAULT 'MAD' | Devise du budget |
| status | ENUM | NOT NULL | draft / active / completed / cancelled |
| allowed_categories | TEXT[] | | Catégories de dépenses autorisées |
| advance_amount | DECIMAL(12,2) | DEFAULT 0 | Montant d'avance accordée |
| created_at | TIMESTAMP | DEFAULT NOW() | Date de création |
| updated_at | TIMESTAMP | DEFAULT NOW() | Dernière mise à jour |

#### Table : `mission_assignments`

| Champ | Type | Contrainte | Description |
|---|---|---|---|
| id | UUID | PK, NOT NULL | Identifiant de l'assignation |
| mission_id | UUID | FK → missions | Mission concernée |
| user_id | UUID | FK → users | Employé assigné |
| assigned_by | UUID | FK → users | Financier ayant assigné |
| assigned_at | TIMESTAMP | DEFAULT NOW() | Date d'assignation |

#### Table : `expenses`

| Champ | Type | Contrainte | Description |
|---|---|---|---|
| id | UUID | PK, NOT NULL | Identifiant unique de la dépense |
| mission_id | UUID | FK → missions | Mission concernée |
| user_id | UUID | FK → users | Employé qui a saisi la dépense |
| submitted_by | UUID | FK → users | Saisi par (si délégation différente de user_id) |
| category | ENUM | NOT NULL | transport / hotel / meals / fuel / toll / parking / other |
| amount | DECIMAL(10,2) | NOT NULL | Montant dans la devise saisie |
| currency | VARCHAR(3) | NOT NULL | Devise de saisie |
| amount_base | DECIMAL(10,2) | | Montant converti en devise de référence |
| exchange_rate | DECIMAL(10,6) | | Taux de change utilisé |
| expense_date | DATE | NOT NULL | Date de la dépense |
| description | TEXT | NOT NULL | Description de la dépense |
| note | TEXT | | Note supplémentaire |
| receipt_url | TEXT | | URL du justificatif stocké (S3/Cloudinary) |
| ocr_data | JSONB | | Données extraites par OCR |
| status | ENUM | NOT NULL | pending / approved_n1 / approved / rejected / reimbursed |
| rejection_reason | TEXT | | Motif de refus si la dépense est rejetée |
| approved_by | UUID | FK → users | Financier qui a validé |
| approved_at | TIMESTAMP | | Date de validation |
| reimbursed_at | TIMESTAMP | | Date de remboursement |
| reimbursement_ref | VARCHAR(100) | | Référence de virement |
| created_at | TIMESTAMP | DEFAULT NOW() | Date de création |
| updated_at | TIMESTAMP | DEFAULT NOW() | Dernière mise à jour |

#### Table : `expense_comments`

| Champ | Type | Contrainte | Description |
|---|---|---|---|
| id | UUID | PK, NOT NULL | Identifiant du commentaire |
| expense_id | UUID | FK → expenses | Dépense concernée |
| author_id | UUID | FK → users | Auteur du commentaire |
| content | TEXT | NOT NULL | Contenu du message |
| created_at | TIMESTAMP | DEFAULT NOW() | Date d'envoi |

#### Table : `notifications`

| Champ | Type | Contrainte | Description |
|---|---|---|---|
| id | UUID | PK, NOT NULL | Identifiant unique |
| user_id | UUID | FK → users | Destinataire |
| type | VARCHAR(100) | NOT NULL | Type de notification |
| title | VARCHAR(300) | NOT NULL | Titre |
| message | TEXT | NOT NULL | Corps du message |
| data | JSONB | | Données annexes (lien, ID concerné) |
| is_read | BOOLEAN | DEFAULT false | Lu ou non |
| created_at | TIMESTAMP | DEFAULT NOW() | Date d'envoi |

#### Table : `expense_category_limits`

| Champ | Type | Contrainte | Description |
|---|---|---|---|
| id | UUID | PK, NOT NULL | Identifiant |
| organization_id | UUID | FK → organizations | Organisation concernée |
| category | ENUM | NOT NULL | Catégorie concernée |
| daily_limit | DECIMAL(10,2) | | Plafond journalier |
| per_expense_limit | DECIMAL(10,2) | | Plafond par dépense unique |
| requires_receipt_above | DECIMAL(10,2) | DEFAULT 0 | Justificatif obligatoire si montant supérieur à |

#### Table : `audit_logs`

| Champ | Type | Contrainte | Description |
|---|---|---|---|
| id | UUID | PK, NOT NULL | Identifiant |
| organization_id | UUID | FK → organizations | Organisation |
| user_id | UUID | FK → users | Utilisateur acteur |
| action | VARCHAR(200) | NOT NULL | Action effectuée |
| entity_type | VARCHAR(100) | NOT NULL | Type d'entité (mission, expense, user…) |
| entity_id | UUID | | ID de l'entité concernée |
| old_data | JSONB | | Données avant modification |
| new_data | JSONB | | Données après modification |
| ip_address | VARCHAR(50) | | Adresse IP de l'acteur |
| created_at | TIMESTAMP | DEFAULT NOW() | Horodatage |

#### Table : `refresh_tokens`

| Champ | Type | Contrainte | Description |
|---|---|---|---|
| id | UUID | PK, NOT NULL | Identifiant |
| user_id | UUID | FK → users | Utilisateur concerné |
| token_hash | TEXT | NOT NULL | Token haché |
| device_info | TEXT | | Info appareil (User-Agent) |
| expires_at | TIMESTAMP | NOT NULL | Date d'expiration |
| revoked_at | TIMESTAMP | | Révoqué si non null |
| created_at | TIMESTAMP | DEFAULT NOW() | Date de génération |

### 5.2 Relations Principales (résumé)

- `organizations` 1—N `users`
- `organizations` 1—N `missions`
- `organizations` 1—N `expense_category_limits`
- `organizations` 1—N `audit_logs`
- `users` 1—N `mission_assignments` (en tant qu'employé assigné)
- `users` 1—N `expenses` (en tant qu'auteur, `submitted_by` ou `approved_by`)
- `users` 1—N `refresh_tokens`
- `users` self-référence via `manager_id` (relation N+1)
- `missions` 1—N `mission_assignments`
- `missions` 1—N `expenses`
- `expenses` 1—N `expense_comments`

---

## 6. Architecture Technique

### 6.1 Stack Technologique

| Couche | Technologie & Justification |
|---|---|
| Backend API | NestJS 10 (Node.js 20 LTS) — Architecture modulaire, injection de dépendances, TypeScript natif |
| Frontend Web | Next.js 14 (App Router) + TypeScript — SSR, performance, SEO |
| Application Mobile | React Native 0.74 + Expo SDK 51 — iOS & Android unifiés |
| Base de Données | PostgreSQL 16 — ACID, relations, JSONB pour flexibilité |
| ORM | Prisma ORM (module NestJS dédié) — Migrations, type safety, DX excellent |
| Authentification | JWT (Access + Refresh Token) via @nestjs/passport + bcrypt + option 2FA (TOTP) |
| Validation | class-validator + class-transformer sur les DTO NestJS |
| Stockage fichiers | AWS S3 ou Cloudinary — Hébergement des justificatifs |
| Emails | Module NestJS Nodemailer + SendGrid ou Resend — Transactionnels & campagnes |
| Notifications Push | Firebase Cloud Messaging (FCM) — iOS & Android |
| OCR | Google Cloud Vision API — Reconnaissance de reçus |
| Cache | Redis (@nestjs/cache-manager) — Sessions, rate limiting, cache des taux de change |
| Queue / Jobs | BullMQ (@nestjs/bullmq, Redis-based) — Envoi emails, génération rapports asynchrone |
| Paiement / SaaS | Stripe — Abonnements, facturation, webhooks |
| Déploiement API | Docker + Railway ou Render — Déploiement simple et scalable |
| Déploiement Frontend | Vercel — Déploiement automatique, CDN mondial, Edge |
| Monitoring | Sentry (erreurs) + Datadog ou Grafana (métriques) |

### 6.2 Architecture des Dossiers — Backend (NestJS)

```
missionx-api/
├── src/
│   ├── main.ts                      # Bootstrap de l'application NestJS
│   ├── app.module.ts                # Module racine
│   ├── config/                      # configuration.ts, database.config.ts, redis.config.ts (via @nestjs/config)
│   ├── common/
│   │   ├── guards/                  # jwt-auth.guard.ts, roles.guard.ts
│   │   ├── decorators/              # roles.decorator.ts, current-user.decorator.ts
│   │   ├── interceptors/            # logging.interceptor.ts, transform.interceptor.ts
│   │   ├── pipes/                   # validation.pipe.ts
│   │   └── filters/                 # http-exception.filter.ts
│   ├── modules/
│   │   ├── auth/                    # auth.module.ts, auth.controller.ts, auth.service.ts, strategies/
│   │   ├── users/                   # users.module.ts, users.controller.ts, users.service.ts, dto/
│   │   ├── organizations/           # organizations.module.ts, organizations.controller.ts, organizations.service.ts
│   │   ├── missions/                # missions.module.ts, missions.controller.ts, missions.service.ts, dto/
│   │   ├── expenses/                # expenses.module.ts, expenses.controller.ts, expenses.service.ts, dto/
│   │   ├── reports/                 # reports.module.ts, reports.service.ts (PDF/Excel)
│   │   ├── notifications/           # notifications.module.ts, notifications.service.ts, email.service.ts, push.service.ts
│   │   ├── ocr/                     # ocr.module.ts, ocr.service.ts (Google Vision)
│   │   └── jobs/                    # email.processor.ts, report.processor.ts (BullMQ)
│   └── prisma/                      # prisma.module.ts, prisma.service.ts, schema.prisma, migrations/
├── test/                            # unit/, e2e/
├── Dockerfile
└── .env.example
```

### 6.3 Architecture des Dossiers — Frontend (Next.js)

```
missionx-web/
├── app/
│   ├── (auth)/                      # login/, register/, forgot-password/
│   ├── (dashboard)/
│   │   ├── finance/                 # dashboard/, missions/, expenses/, employees/, reports/
│   │   ├── employee/                # dashboard/, my-missions/, add-expense/
│   │   └── admin/                   # organizations/, plans/, audit/
│   └── api/                         # Route handlers Next.js (webhooks Stripe…)
├── components/
│   ├── ui/                          # Button, Input, Modal, Table, Badge…
│   ├── dashboard/                   # StatsCard, ExpenseChart, MissionCard…
│   └── forms/                       # AddExpenseForm, CreateMissionForm…
├── lib/
│   ├── api.ts                       # Client Axios avec intercepteurs JWT
│   ├── auth.ts                      # Configuration NextAuth.js
│   └── utils.ts                     # Formatters, helpers
├── hooks/                           # useMissions.ts, useExpenses.ts, useNotifications.ts
├── store/                           # Zustand ou Redux Toolkit
├── types/                           # index.ts (types TypeScript globaux)
└── public/                          # Assets statiques
```

### 6.4 Architecture des Dossiers — Mobile (React Native / Expo)

```
missionx-mobile/
├── app/                             # Expo Router (navigation basée sur les fichiers)
│   ├── (auth)/                      # login.tsx, activate.tsx
│   └── (tabs)/
│       ├── index.tsx                # Tableau de bord employé
│       ├── missions.tsx             # Liste des missions
│       ├── add-expense.tsx          # Formulaire ajout dépense + caméra
│       └── profile.tsx              # Profil et paramètres
├── components/                      # Composants réutilisables
├── hooks/                           # useCamera.ts, useNotifications.ts
├── services/                        # api.ts (mêmes endpoints que le web), storage.ts
├── constants/                       # Colors, fonts, layouts
├── assets/                          # Images, icônes, splash screen
└── app.json                         # Configuration Expo
```

### 6.5 Principaux Endpoints API (REST)

| Méthode + Route | Description | Accès |
|---|---|---|
| POST /auth/login | Connexion utilisateur (retourne un JWT) | Public |
| POST /auth/refresh | Rafraîchit l'access token | Public |
| POST /auth/activate | Active un compte avec le token d'invitation | Public |
| POST /auth/forgot-password | Demande de réinitialisation | Public |
| GET /users | Liste des employés de l'organisation | Finance |
| POST /users/invite | Inviter un nouvel employé | Finance |
| GET /users/:id | Profil d'un employé | Finance / Self |
| PUT /users/:id | Modifier un profil | Finance / Self |
| DELETE /users/:id | Désactiver un compte | Finance |
| GET /missions | Liste des missions (filtré par rôle) | Auth |
| POST /missions | Créer une nouvelle mission | Finance |
| GET /missions/:id | Détails d'une mission | Auth |
| PUT /missions/:id | Modifier une mission | Finance |
| POST /missions/:id/assign | Assigner des employés | Finance |
| GET /expenses | Liste des dépenses (filtré par rôle) | Auth |
| POST /expenses | Soumettre une nouvelle dépense | Employee |
| GET /expenses/:id | Détail d'une dépense | Auth |
| PUT /expenses/:id | Modifier (si en attente) | Employee |
| DELETE /expenses/:id | Supprimer (si en attente) | Employee |
| POST /expenses/:id/approve | Valider une dépense | Finance / Approver |
| POST /expenses/:id/reject | Refuser avec motif | Finance / Approver |
| POST /expenses/:id/reimburse | Marquer comme remboursé | Finance |
| POST /expenses/ocr | Extraire les données d'un reçu (OCR) | Employee |
| GET /reports/mission/:id | Rapport d'une mission | Finance |
| GET /reports/export | Export PDF ou Excel | Finance |
| GET /dashboard/finance | Statistiques du dashboard financier | Finance |
| GET /notifications | Notifications de l'utilisateur | Auth |
| PUT /notifications/:id/read | Marquer comme lue | Auth |

---

## 7. Sécurité

### 7.1 Authentification et Autorisation

- JWT Access Token (durée de vie : 15 minutes) + Refresh Token (7 jours, stocké en cookie HttpOnly)
- Hachage des mots de passe avec bcrypt (salt rounds : 12)
- RBAC (Role-Based Access Control) implémenté via un `RolesGuard` NestJS combiné au décorateur `@Roles()` sur chaque route
- Option 2FA via TOTP (Google Authenticator) pour les comptes à hauts privilèges
- Isolation multi-tenant : chaque requête est filtrée par `organization_id` extrait du JWT

### 7.2 Sécurité de l'API

- Rate Limiting via `@nestjs/throttler` + Redis : 100 requêtes / 15 min par IP, 10 tentatives de login / 15 min
- Validation des entrées via des DTO NestJS avec `class-validator` (décorateurs typés sur chaque endpoint)
- Protection CORS configurée pour n'autoriser que les domaines autorisés
- Headers de sécurité via Helmet : CSP, X-Frame-Options, HSTS
- Audit log de toutes les actions sensibles dans la table `audit_logs`
- Les fichiers uploadés sont analysés (type MIME réel vérifié) avant stockage

### 7.3 Protection des Données

- Toutes les communications en HTTPS (TLS 1.3)
- Données sensibles chiffrées at rest dans la base de données
- Justificatifs stockés dans des buckets privés S3 avec URLs signées (TTL 1h)
- Conformité RGPD : droit à l'effacement, export des données personnelles

---

## 8. Plans Tarifaires SaaS

### 8.1 Modèle de Facturation

| Fonctionnalité | Starter | Pro / Enterprise |
|---|---|---|
| Employés | Jusqu'à 10 | Illimités |
| Missions simultanées | 5 | Illimitées |
| Stockage justificatifs | 2 Go | 50 Go+ |
| OCR automatique | Non | Oui |
| Export Excel/PDF | Basique | Avancé + comptable |
| Workflow approbation N+1 | Non | Oui |
| Multi-devises | Non | Oui |
| Intégration comptable | Non | Oui (Sage, QuickBooks) |
| Application mobile | Oui | Oui |
| Support | Email 48h | Prioritaire + téléphone |
| Audit logs | 30 jours | 12 mois |
| Accès API | Non | Oui (clé API) |

- Paiement mensuel ou annuel (remise de 20 % en annuel)
- Facturation par Stripe avec génération automatique des factures
- Période d'essai gratuite de 14 jours sans carte bancaire
- Upgrade / downgrade de plan en libre-service

---

## 9. Roadmap de Développement

| Phase | Contenu & Durée Estimée |
|---|---|
| **Phase 1 — MVP** (2 mois) | Auth (NestJS) + Gestion missions + Saisie dépenses + Validation + Dashboard de base + Emails |
| **Phase 2 — Core** (1 mois) | OCR justificatifs + Multi-devises + Rapports PDF/Excel + Notifications push |
| **Phase 3 — Mobile** (1,5 mois) | Application React Native complète (iOS + Android) + Caméra OCR |
| **Phase 4 — Scale** (1 mois) | Intégration comptable + Workflow N+1 + API publique + Plans Stripe |
| **Phase 5 — Croissance** | Analytics avancés + IA de détection de fraude + Intégration RH (Odoo, Workday) |

---

## 10. Glossaire

| Terme | Définition |
|---|---|
| **Mission** | Déplacement professionnel assigné à un ou plusieurs employés avec un budget défini |
| **Dépense** | Frais engagé par un employé dans le cadre d'une mission |
| **Justificatif** | Reçu ou facture photographié pour prouver une dépense |
| **OCR** | Optical Character Recognition — extraction automatique de texte depuis une image |
| **JWT** | JSON Web Token — standard d'authentification sans session serveur |
| **RBAC** | Role-Based Access Control — contrôle d'accès basé sur les rôles |
| **Multi-tenant** | Architecture où plusieurs organisations partagent la même infrastructure isolée |
| **SaaS** | Software as a Service — logiciel hébergé et facturé par abonnement |
| **Workflow** | Chaîne d'actions déclenchées automatiquement selon les événements |
| **Avance de mission** | Montant versé à l'employé avant la mission pour préfinancer ses dépenses |
| **DTO** | Data Transfer Object — objet NestJS décrivant et validant la forme des données échangées via l'API |
| **Guard** | Composant NestJS exécuté avant le contrôleur pour autoriser ou refuser une requête (ex. RolesGuard) |
| **Module (NestJS)** | Unité d'organisation regroupant contrôleurs, services et providers liés à un domaine fonctionnel |

---

*Document généré par MissionX — Confidentiel — Juillet 2026*
