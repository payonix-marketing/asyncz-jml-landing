import json
from copy import deepcopy

translations = {
    "en": {
        "navigation": {"blog": "Blog"},
        "contact": {"goToContactPage": "View contact page"},
        "locationSpotlight": {
            "tagline": "Local expertise",
            "title": "asyncz for teams across the globe",
            "description": "Keep branches aligned from coast to coast with localized booking experiences, AI routing, and region-ready automations.",
            "ctaLabel": "See how asyncz supports global teams",
            "ctaHref": "/contact",
            "highlights": [
                {
                    "icon": "map",
                    "title": "State-compliant scheduling",
                    "description": "Apply state and city blackout periods, service taxes, and provider rules without creating duplicate calendars."
                },
                {
                    "icon": "users",
                    "title": "Bilingual frontline support",
                    "description": "English and Spanish onboarding specialists keep every front desk confident and aligned."
                }
            ]
        },
        "notFound": {
            "tagline": "You found a missing timeslot",
            "title": "This page is off the schedule",
            "subtitle": "The URL you followed no longer exists. Explore asyncz resources to get back on track.",
            "primaryCta": "Return to homepage",
            "secondaryCta": "Contact support",
            "linkDescription": "Discover more about {section}.",
            "explore": "Explore"
        },
        "featuresPage": {
            "pageTitle": "Features - asyncz | AI Scheduling Workflows",
            "metaDescription": "Explore asyncz features including multi-branch orchestration, blacklist protection, analytics dashboards, and AI waitlists.",
            "keywords": [
                "asyncz features",
                "ai scheduling",
                "waitlist automation",
                "multi-branch calendar",
                "asyncz analytics"
            ],
            "tagline": "Product tour",
            "heroTitle": "All-in-one orchestration for every appointment flow",
            "heroSubtitle": "asyncz unifies booking, routing, reminders, and insights so your teams deliver consistent service across every branch.",
            "primaryCta": "Compare pricing plans",
            "secondaryCta": "Talk to sales",
            "coreTitle": "Core capabilities that scale with your branches",
            "coreDescription": "From intelligent calendars to branded communications, asyncz was built to streamline complex operations without extra headcount.",
            "deepDives": [
                {
                    "title": "Multi-location capacity planning",
                    "description": "Balance demand across locations with smart availability windows, padding rules, and staffing thresholds."
                },
                {
                    "title": "Automated communication flows",
                    "description": "Trigger confirmations, reminders, and follow-ups through WhatsApp, SMS, and email—no manual chasing required."
                },
                {
                    "title": "Role-aware access controls",
                    "description": "Give HQ, branch managers, and front-desk teams the right tools without compromising security or auditability."
                }
            ],
            "deepDiveTitle": "Go deeper into the workflows that matter",
            "deepDiveDescription": "asyncz maps every step of the customer journey, from discovery to rebooking, so nothing slips through the cracks.",
            "analyticsHighlight": {
                "title": "Operational analytics in real time",
                "description": "Track utilization, no-show impact, and revenue per seat with dashboards built for service brands.",
                "metrics": [
                    "Branch and provider performance snapshots",
                    "Cancellation reasons with recovery suggestions",
                    "Marketing source attribution with conversion trends"
                ]
            },
            "waitlistHighlight": {
                "title": "AI waitlist that fills empty seats",
                "description": "asyncz recommends the best client to invite based on preferences, travel time, and historical spend so every slot is protected.",
                "metric": "Average 27% fewer unfilled slots across pilot branches."
            },
            "differentiatorTitle": "Why asyncz beats generic booking tools",
            "differentiatorDescription": "Purpose-built workflows keep multi-location teams aligned while protecting against no-shows and spam traffic.",
            "differentiators": [
                {
                    "title": "Enterprise-grade blacklist protection",
                    "description": "Stop repeat no-shows with pattern detection across email, phone, and payment methods."
                },
                {
                    "title": "Embedded analytics for every role",
                    "description": "Surface the insights each teammate needs without sending them to spreadsheets."
                },
                {
                    "title": "API-ready from day one",
                    "description": "Sync availability with custom apps and partner marketplaces through secure webhooks and REST APIs."
                },
                {
                    "title": "Localized experiences",
                    "description": "Serve customers in six languages with localized content, notifications, and SEO-ready pages."
                }
            ],
            "finalCtaTitle": "Ready to orchestrate every appointment with asyncz?",
            "finalCtaDescription": "Our team will blueprint your branches, automations, and analytics in less than a week.",
            "finalPrimaryCta": "Book a strategy session",
            "finalSecondaryCta": "Read customer stories"
        },
        "contactPage": {
            "pageTitle": "Contact asyncz | Schedule a strategy session",
            "metaDescription": "Reach asyncz for demos, pricing, or support. Call +1 (415) 555-0134, email info@asyncz.com, or visit our San Francisco office.",
            "keywords": [
                "asyncz contact",
                "asyncz support",
                "asyncz phone",
                "asyncz email"
            ],
            "tagline": "Let's build your scheduling advantage",
            "heroTitle": "Connect with the asyncz team",
            "heroSubtitle": "Share your goals and we'll tailor a rollout plan for your branches, staff, and customers.",
            "formTitle": "Send us a message",
            "formSubtitle": "Tell us how we can help and we’ll respond within one business day.",
            "form": {
                "name": "Full name",
                "namePlaceholder": "Alex Johnson",
                "email": "Work email",
                "emailPlaceholder": "alex@yourcompany.com",
                "company": "Company",
                "companyPlaceholder": "Your organization",
                "phone": "Phone (optional)",
                "phonePlaceholder": "+1 415 555 0134",
                "topic": "Topic",
                "topicPlaceholder": "Select a topic",
                "topics": [
                    "Product demo",
                    "Pricing question",
                    "Onboarding support",
                    "Partnership opportunity",
                    "Press inquiry"
                ],
                "message": "How can we help?",
                "messagePlaceholder": "Share context, timelines, and the branches you want to enable...",
                "securityQuestion": "What is {a} + {b}? (spam check)",
                "securityPlaceholder": "Enter the answer",
                "submit": "Send message",
                "success": "Thanks! We'll respond within one business day.",
                "error": "Something went wrong. Please try again."
            },
            "infoTitle": "Visit our headquarters",
            "hoursTitle": "Support hours (Pacific Time)",
            "supportTitle": "Support & onboarding",
            "supportDescription": "Every asyncz plan includes guided onboarding, automation audits, and operations coaching.",
            "supportItems": {
                "enterprise": "Enterprise rollout specialists for multi-location teams",
                "email": "Dedicated inbox with <24h response times",
                "training": "Live training sessions and certification tracks"
            },
            "days": {
                "monday": "Monday",
                "tuesday": "Tuesday",
                "wednesday": "Wednesday",
                "thursday": "Thursday",
                "friday": "Friday",
                "saturday": "Saturday",
                "sunday": "Sunday"
            }
        },
        "blog": {
            "pageTitle": "asyncz Blog | AI Scheduling Ideas",
            "metaDescription": "Read asyncz insights on AI scheduling, automation workflows, and multi-branch analytics.",
            "keywords": [
                "asyncz blog",
                "ai scheduling tips",
                "multi-branch operations",
                "asyncz automation"
            ],
            "tagline": "Insights for modern service teams",
            "heroTitle": "Scheduling intelligence for every branch",
            "heroSubtitle": "Playbooks, frameworks, and benchmarks for operations leaders building reliable customer journeys.",
            "categories": ["Product", "Operations", "Growth"],
            "allLabel": "All topics",
            "readMore": "Read article",
            "emptyState": "No articles match this filter yet.",
            "articleNotFoundTitle": "Article not found",
            "articleNotFoundDescription": "This story may have been unpublished. Explore the latest posts instead.",
            "backToBlog": "Back to blog",
            "posts": [
                {
                    "slug": "ai-scheduling-playbook",
                    "title": "AI Scheduling Playbook for Multi-Branch Teams",
                    "excerpt": "Frameworks to align operations, automations, and analytics across every location.",
                    "content": [
                        "Operational complexity scales quickly when your brand expands. asyncz centralizes rules so every branch follows the same, proven playbook.",
                        "Start by mapping your services, availability rules, and exceptions. asyncz's rule engine lets you apply them once and reuse them everywhere.",
                        "Layer analytics on top to keep leadership aware of utilization, demand, and bottlenecks before they affect the customer experience."
                    ],
                    "category": "Product",
                    "author": "Asyncz Editorial Team",
                    "published": "2025-09-10",
                    "readingTime": "6 min read",
                    "tags": ["ai scheduling", "playbook", "multi-branch"]
                },
                {
                    "slug": "asyncz-automation-blueprint",
                    "title": "Automation Blueprint: Reduce No-Shows with asyncz",
                    "excerpt": "Step-by-step automation templates to keep calendars full and customers accountable.",
                    "content": [
                        "Combine confirmation windows, payment rules, and reminder cadences to dramatically cut no-shows without adding admin overhead.",
                        "asyncz connects WhatsApp, SMS, and email so your customers always receive nudges on their preferred channel.",
                        "Use escalation paths for high-value appointments and automatically trigger waitlist invitations when a slot opens."
                    ],
                    "category": "Operations",
                    "author": "Asyncz Customer Success",
                    "published": "2025-08-22",
                    "readingTime": "5 min read",
                    "tags": ["automation", "no-shows", "customer experience"]
                },
                {
                    "slug": "multi-branch-analytics-guide",
                    "title": "Analytics Guide for Multi-Branch Operators",
                    "excerpt": "Dashboards and metrics asyncz customers track to increase utilization and revenue.",
                    "content": [
                        "Beyond basic counts, asyncz highlights the conversion, retention, and rebooking trends that predict revenue.",
                        "Benchmark each branch on utilization, staffing efficiency, and channel performance to prioritize coaching.",
                        "Feed these insights back into marketing and hiring plans so you keep winning the right customers at the right time."
                    ],
                    "category": "Growth",
                    "author": "Asyncz Data Team",
                    "published": "2025-08-05",
                    "readingTime": "7 min read",
                    "tags": ["analytics", "growth", "dashboards"]
                }
            ]
        }
    },
    "es": {
        "navigation": {"blog": "Blog"},
        "contact": {"goToContactPage": "Ver página de contacto"},
        "locationSpotlight": {
            "tagline": "Equipos locales",
            "title": "asyncz para equipos en España",
            "description": "Coordina sucursales de Madrid a Barcelona con reservas localizadas, reglas fiscales y automatizaciones adaptadas a cada provincia.",
            "ctaLabel": "Habla con nuestro equipo en España",
            "ctaHref": "/contact",
            "highlights": [
                {
                    "icon": "map",
                    "title": "Cumplimiento autonómico",
                    "description": "Gestiona festivos regionales, franjas horarias y tipos de IVA sin duplicar calendarios."
                },
                {
                    "icon": "users",
                    "title": "Soporte bilingüe",
                    "description": "Especialistas en español e inglés acompañan a tus recepciones durante el despliegue."
                }
            ]
        },
        "notFound": {
            "tagline": "Has encontrado un hueco vacío",
            "title": "Esta página no está disponible",
            "subtitle": "El enlace que seguiste ya no existe. Explora los recursos de asyncz para continuar.",
            "primaryCta": "Volver al inicio",
            "secondaryCta": "Contactar soporte",
            "linkDescription": "Descubre más sobre {section}.",
            "explore": "Explorar"
        },
        "featuresPage": {
            "pageTitle": "Funciones - asyncz | Flujos de programación con IA",
            "metaDescription": "Descubre las funciones de asyncz: orquestación multisedes, protección contra listas negras, analítica y listas de espera inteligentes.",
            "keywords": [
                "funciones asyncz",
                "agenda inteligente",
                "automatización de listas de espera",
                "calendario multisedes",
                "analítica asyncz"
            ],
            "tagline": "Recorrido del producto",
            "heroTitle": "Orquestación integral para cada cita",
            "heroSubtitle": "asyncz unifica reservas, enrutamiento, recordatorios y analítica para ofrecer experiencias consistentes en todas tus sedes.",
            "primaryCta": "Comparar planes",
            "secondaryCta": "Hablar con ventas",
            "coreTitle": "Capacidades clave que crecen contigo",
            "coreDescription": "Desde calendarios inteligentes hasta comunicaciones personalizadas, asyncz simplifica operaciones complejas sin añadir carga administrativa.",
            "deepDives": [
                {
                    "title": "Planificación de capacidad multisedes",
                    "description": "Equilibra la demanda con ventanas de disponibilidad, reglas de desplazamiento y límites de personal."
                },
                {
                    "title": "Flujos de comunicación automatizados",
                    "description": "Envía confirmaciones, recordatorios y seguimientos por WhatsApp, SMS o email sin trabajo manual."
                },
                {
                    "title": "Accesos según rol",
                    "description": "Da a dirección, encargados y recepción las herramientas correctas manteniendo la seguridad."
                }
            ],
            "deepDiveTitle": "Profundiza en los flujos que importan",
            "deepDiveDescription": "asyncz mapea cada paso del viaje del cliente para que ningún detalle se pierda entre sedes.",
            "analyticsHighlight": {
                "title": "Analítica operativa en tiempo real",
                "description": "Supervisa utilización, impacto de ausencias e ingresos por recurso con paneles diseñados para marcas de servicios.",
                "metrics": [
                    "Instantáneas de rendimiento por sede y profesional",
                    "Motivos de cancelación con recomendaciones de recuperación",
                    "Atribución de canales y tendencias de conversión"
                ]
            },
            "waitlistHighlight": {
                "title": "Lista de espera con IA",
                "description": "asyncz propone al cliente ideal según preferencias, tiempo de desplazamiento e historial de gasto para que cada hueco se aproveche.",
                "metric": "27 % menos huecos sin cubrir en los pilotos de varias franquicias."
            },
            "differentiatorTitle": "Por qué asyncz supera a las agendas genéricas",
            "differentiatorDescription": "Flujos específicos mantienen alineados a equipos multisedes mientras bloquean el spam y las ausencias repetidas.",
            "differentiators": [
                {
                    "title": "Protección avanzada contra listas negras",
                    "description": "Detecta patrones en correo, teléfono y pagos para frenar reincidencias."
                },
                {
                    "title": "Analítica integrada por rol",
                    "description": "Cada equipo recibe los indicadores que necesita sin hojas de cálculo."
                },
                {
                    "title": "API lista desde el día uno",
                    "description": "Sincroniza disponibilidad con apps propias y marketplaces mediante webhooks seguros."
                },
                {
                    "title": "Experiencias localizadas",
                    "description": "Contenido, notificaciones y SEO listos en seis idiomas."
                }
            ],
            "finalCtaTitle": "¿Listo para orquestar todas tus citas con asyncz?",
            "finalCtaDescription": "Diseñamos tu plan de sucursales, automatizaciones y analítica en menos de una semana.",
            "finalPrimaryCta": "Reserva una sesión estratégica",
            "finalSecondaryCta": "Leer casos de clientes"
        },
        "contactPage": {
            "pageTitle": "Contacto asyncz | Solicita una sesión estratégica",
            "metaDescription": "Contacta con asyncz para demos, precios o soporte. Llama al +1 (415) 555-0134, escribe a info@asyncz.com o visita nuestra oficina de San Francisco.",
            "keywords": [
                "contacto asyncz",
                "soporte asyncz",
                "teléfono asyncz",
                "correo asyncz"
            ],
            "tagline": "Construyamos tu ventaja",
            "heroTitle": "Conecta con el equipo de asyncz",
            "heroSubtitle": "Comparte tus objetivos y prepararemos un plan de despliegue para tus sucursales y equipos.",
            "formTitle": "Envíanos un mensaje",
            "formSubtitle": "Te responderemos en menos de un día laborable.",
            "form": {
                "name": "Nombre completo",
                "namePlaceholder": "Laura Gómez",
                "email": "Correo corporativo",
                "emailPlaceholder": "laura@tuempresa.com",
                "company": "Empresa",
                "companyPlaceholder": "Nombre de la organización",
                "phone": "Teléfono (opcional)",
                "phonePlaceholder": "+34 600 123 123",
                "topic": "Tema",
                "topicPlaceholder": "Selecciona un tema",
                "topics": [
                    "Demostración del producto",
                    "Pregunta sobre precios",
                    "Soporte de implementación",
                    "Oportunidad de alianza",
                    "Prensa"
                ],
                "message": "¿Cómo podemos ayudarte?",
                "messagePlaceholder": "Describe contexto, plazos y las sedes que quieres activar...",
                "securityQuestion": "¿Cuánto es {a} + {b}? (control anti-spam)",
                "securityPlaceholder": "Introduce la respuesta",
                "submit": "Enviar mensaje",
                "success": "¡Gracias! Te contactaremos en breve.",
                "error": "Ha ocurrido un error. Intenta de nuevo."
            },
            "infoTitle": "Visita nuestra oficina",
            "hoursTitle": "Horario de soporte (hora del Pacífico)",
            "supportTitle": "Soporte y onboarding",
            "supportDescription": "Todos los planes de asyncz incluyen acompañamiento, auditorías de automatización y sesiones de coaching.",
            "supportItems": {
                "enterprise": "Especialistas en despliegues multisedes",
                "email": "Buzón dedicado con respuesta inferior a 24h",
                "training": "Formaciones en directo y certificaciones"
            },
            "days": {
                "monday": "Lunes",
                "tuesday": "Martes",
                "wednesday": "Miércoles",
                "thursday": "Jueves",
                "friday": "Viernes",
                "saturday": "Sábado",
                "sunday": "Domingo"
            }
        },
        "blog": {
            "pageTitle": "Blog asyncz | Ideas de programación inteligente",
            "metaDescription": "Lee artículos sobre programación con IA, automatización y analítica para operadores multisedes.",
            "keywords": [
                "blog asyncz",
                "programación inteligente",
                "operaciones multisedes",
                "automatización asyncz"
            ],
            "tagline": "Ideas para equipos de servicios",
            "heroTitle": "Inteligencia de programación para cada sucursal",
            "heroSubtitle": "Manual práctico para líderes de operaciones que quieren experiencias coherentes y predecibles.",
            "categories": ["Producto", "Operaciones", "Crecimiento"],
            "allLabel": "Todos los temas",
            "readMore": "Leer artículo",
            "emptyState": "No hay publicaciones con este filtro todavía.",
            "articleNotFoundTitle": "Artículo no encontrado",
            "articleNotFoundDescription": "Puede que la publicación haya sido retirada. Consulta las últimas novedades.",
            "backToBlog": "Volver al blog",
            "posts": [
                {
                    "slug": "ai-scheduling-playbook",
                    "title": "Guía de programación con IA para equipos multisedes",
                    "excerpt": "Métodos para alinear operaciones, automatizaciones y analítica en todas tus ubicaciones.",
                    "content": [
                        "Cuando creces, la complejidad operativa se multiplica. asyncz centraliza las reglas para que cada sede trabaje con el mismo playbook.",
                        "Empieza definiendo servicios, reglas de disponibilidad y excepciones. Con asyncz los aplicas una vez y se reutilizan en todas las sedes.",
                        "Añade analítica para detectar utilización, demanda y cuellos de botella antes de que afecten al cliente."
                    ],
                    "category": "Producto",
                    "author": "Equipo editorial de Asyncz",
                    "published": "2025-09-10",
                    "readingTime": "Lectura de 6 minutos",
                    "tags": ["programación ia", "manual", "multisede"]
                },
                {
                    "slug": "asyncz-automation-blueprint",
                    "title": "Automatización para reducir ausencias con asyncz",
                    "excerpt": "Plantillas que mantienen la agenda llena y clientes responsables.",
                    "content": [
                        "Combina ventanas de confirmación, reglas de pago y recordatorios para reducir ausencias sin más carga administrativa.",
                        "asyncz integra WhatsApp, SMS y email para que cada cliente reciba avisos en su canal preferido.",
                        "Crea rutas de escalado para citas críticas y activa invitaciones de lista de espera cuando se libere un hueco."
                    ],
                    "category": "Operaciones",
                    "author": "Customer Success de Asyncz",
                    "published": "2025-08-22",
                    "readingTime": "Lectura de 5 minutos",
                    "tags": ["automatización", "ausencias", "experiencia cliente"]
                },
                {
                    "slug": "multi-branch-analytics-guide",
                    "title": "Analítica para operadores multisedes",
                    "excerpt": "Paneles e indicadores que los clientes de asyncz usan para crecer.",
                    "content": [
                        "Más allá de los conteos básicos, asyncz muestra tendencias de conversión, retención y rebooking que anticipan ingresos.",
                        "Compara cada sede en utilización, eficiencia de personal y rendimiento de canales para priorizar formación.",
                        "Usa estas métricas para planificar marketing y contratación ganando a los clientes correctos en el momento adecuado."
                    ],
                    "category": "Crecimiento",
                    "author": "Equipo de Datos de Asyncz",
                    "published": "2025-08-05",
                    "readingTime": "Lectura de 7 minutos",
                    "tags": ["analítica", "crecimiento", "paneles"]
                }
            ]
        }
    },
    "de": {
        "navigation": {"blog": "Blog"},
        "contact": {"goToContactPage": "Kontaktseite ansehen"},
        "locationSpotlight": {
            "tagline": "Lokale Teams",
            "title": "asyncz für Teams in Deutschland",
            "description": "Steuere Filialen von Berlin bis München mit lokalen Buchungserlebnissen, steuerkonformen Regeln und Automationen pro Bundesland.",
            "ctaLabel": "Mit unserem DACH-Team sprechen",
            "ctaHref": "/contact",
            "highlights": [
                {
                    "icon": "map",
                    "title": "Landesspezifische Vorgaben",
                    "description": "Berücksichtige Feiertage, Behandlungspausen und Umsatzsteuer automatisch je Standort."
                },
                {
                    "icon": "users",
                    "title": "Support auf Deutsch und Englisch",
                    "description": "Unsere Spezialisten begleiten Empfang und Management während des gesamten Rollouts."
                }
            ]
        },
        "notFound": {
            "tagline": "Du hast einen leeren Slot gefunden",
            "title": "Diese Seite steht nicht im Plan",
            "subtitle": "Der Link ist nicht mehr gültig. Entdecke stattdessen unsere wichtigsten asyncz-Seiten.",
            "primaryCta": "Zur Startseite",
            "secondaryCta": "Support kontaktieren",
            "linkDescription": "Mehr über {section} erfahren.",
            "explore": "Entdecken"
        },
        "featuresPage": {
            "pageTitle": "Funktionen - asyncz | KI-gestützte Terminflüsse",
            "metaDescription": "Lerne die asyncz-Funktionen kennen: Filialorchestrierung, Blacklist-Schutz, Analysen und intelligente Wartelisten.",
            "keywords": [
                "asyncz funktionen",
                "ki terminplanung",
                "warteliste automation",
                "filial kalender",
                "asyncz analytics"
            ],
            "tagline": "Produkt-Tour",
            "heroTitle": "All-in-one-Orchestrierung für jeden Termin",
            "heroSubtitle": "asyncz verbindet Buchung, Routing, Erinnerungen und Insights, damit alle Standorte gleichbleibend liefern.",
            "primaryCta": "Preise vergleichen",
            "secondaryCta": "Mit Vertrieb sprechen",
            "coreTitle": "Kernfunktionen, die mitwachsen",
            "coreDescription": "Intelligente Kalender, markenkonforme Kommunikation und Automationen reduzieren manuellen Aufwand in jeder Filiale.",
            "deepDives": [
                {
                    "title": "Kapazitätsplanung über Standorte",
                    "description": "Balanciere Nachfrage mit Verfügbarkeitsfenstern, Pufferzeiten und Personalgrenzen."
                },
                {
                    "title": "Automatisierte Kommunikationsflüsse",
                    "description": "Bestätigungen, Erinnerungen und Follow-ups laufen über WhatsApp, SMS oder E-Mail ganz ohne Nachfassen."
                },
                {
                    "title": "Rollenbasierte Zugriffe",
                    "description": "Zentrale, Filialleitung und Empfang arbeiten sicher in einer Plattform zusammen."
                }
            ],
            "deepDiveTitle": "Tiefer in entscheidende Abläufe eintauchen",
            "deepDiveDescription": "asyncz bildet jede Phase der Customer Journey ab, damit nichts verloren geht.",
            "analyticsHighlight": {
                "title": "Operative Analytics in Echtzeit",
                "description": "Überwache Auslastung, No-Show-Quote und Umsatz pro Ressource mit branchenspezifischen Dashboards.",
                "metrics": [
                    "Performance-Snapshot pro Standort und Mitarbeiter",
                    "Stornogründe mit Handlungsempfehlungen",
                    "Kanal- und Kampagnen-Attribution"
                ]
            },
            "waitlistHighlight": {
                "title": "KI-Warteliste füllt freie Slots",
                "description": "asyncz schlägt den passenden Gast anhand von Präferenzen, Entfernung und Umsatzhistorie vor.",
                "metric": "27 % weniger Leerzeiten in deutschen Pilotstandorten."
            },
            "differentiatorTitle": "Warum asyncz mehr kann als Standard-Tools",
            "differentiatorDescription": "Branchenspezifische Workflows halten Multi-Location-Teams synchron und blocken Spam sowie Wiederholungstäter.",
            "differentiators": [
                {
                    "title": "Blacklist-Schutz auf Enterprise-Niveau",
                    "description": "Erkenne Muster über E-Mail, Telefon und Zahlungsmittel."
                },
                {
                    "title": "Insights direkt im Workflow",
                    "description": "Teams sehen nur die Kennzahlen, die sie wirklich brauchen."
                },
                {
                    "title": "API ab Tag eins",
                    "description": "Verknüpfe eigene Apps und Partnerportale per Webhook oder REST."                
                },
                {
                    "title": "Lokalisierte Erlebnisse",
                    "description": "Sechs Sprachen für Inhalte, Benachrichtigungen und SEO."
                }
            ],
            "finalCtaTitle": "Bereit, jeden Termin mit asyncz zu steuern?",
            "finalCtaDescription": "Wir entwerfen deinen Rollout inklusive Automationen und Analytics in weniger als einer Woche.",
            "finalPrimaryCta": "Strategietermin buchen",
            "finalSecondaryCta": "Erfolgsgeschichten lesen"
        },
        "contactPage": {
            "pageTitle": "Kontakt asyncz | Strategietermin buchen",
            "metaDescription": "Kontaktiere asyncz für Demos, Preise oder Support. Telefon +1 (415) 555-0134, E-Mail info@asyncz.com oder Besuch in San Francisco.",
            "keywords": [
                "asyncz kontakt",
                "asyncz support",
                "asyncz telefon",
                "asyncz email"
            ],
            "tagline": "Gemeinsam schneller werden",
            "heroTitle": "Sprich mit dem asyncz-Team",
            "heroSubtitle": "Teile Ziele und Standorte – wir bauen den Fahrplan für deine Organisation.",
            "formTitle": "Nachricht senden",
            "formSubtitle": "Wir melden uns innerhalb eines Werktages.",
            "form": {
                "name": "Vollständiger Name",
                "namePlaceholder": "Max Mustermann",
                "email": "Geschäftliche E-Mail",
                "emailPlaceholder": "max@firma.de",
                "company": "Unternehmen",
                "companyPlaceholder": "Name der Organisation",
                "phone": "Telefon (optional)",
                "phonePlaceholder": "+49 30 123456",
                "topic": "Anliegen",
                "topicPlaceholder": "Thema auswählen",
                "topics": [
                    "Produktdemo",
                    "Frage zu Preisen",
                    "Onboarding-Support",
                    "Partnerschaft",
                    "Presse"
                ],
                "message": "Wie können wir helfen?",
                "messagePlaceholder": "Beschreibe Kontext, Zeitplan und beteiligte Standorte...",
                "securityQuestion": "Wie viel ist {a} + {b}? (Spam-Schutz)",
                "securityPlaceholder": "Antwort eingeben",
                "submit": "Nachricht senden",
                "success": "Danke! Wir melden uns zeitnah.",
                "error": "Etwas ist schiefgelaufen. Bitte erneut versuchen."
            },
            "infoTitle": "Besuche unser Headquarter",
            "hoursTitle": "Supportzeiten (Pazifik)",
            "supportTitle": "Support & Onboarding",
            "supportDescription": "Jeder asyncz-Plan enthält geführtes Onboarding, Automations-Checks und Coaching.",
            "supportItems": {
                "enterprise": "Rollout-Spezialisten für Filialnetze",
                "email": "Postfach mit Antwort binnen 24 Stunden",
                "training": "Live-Trainings und Zertifizierungen"
            },
            "days": {
                "monday": "Montag",
                "tuesday": "Dienstag",
                "wednesday": "Mittwoch",
                "thursday": "Donnerstag",
                "friday": "Freitag",
                "saturday": "Samstag",
                "sunday": "Sonntag"
            }
        },
        "blog": {
            "pageTitle": "asyncz Blog | Ideen für KI-gestützte Terminplanung",
            "metaDescription": "Artikel über KI-gestützte Terminplanung, Automationen und Analytics für Filialbetriebe.",
            "keywords": [
                "asyncz blog",
                "terminplanung ki",
                "mehrere standorte",
                "asyncz automation"
            ],
            "tagline": "Insights für Service-Teams",
            "heroTitle": "Planungsintelligenz für jede Filiale",
            "heroSubtitle": "Strategien und Benchmarks für Operations-Leader, die zuverlässige Kundenreisen schaffen.",
            "categories": ["Produkt", "Operationen", "Wachstum"],
            "allLabel": "Alle Themen",
            "readMore": "Artikel lesen",
            "emptyState": "Keine Beiträge für diesen Filter.",
            "articleNotFoundTitle": "Artikel nicht gefunden",
            "articleNotFoundDescription": "Dieser Beitrag wurde entfernt. Schau dir die neuesten Insights an.",
            "backToBlog": "Zurück zum Blog",
            "posts": [
                {
                    "slug": "ai-scheduling-playbook",
                    "title": "KI-Playbook für Filialbetriebe",
                    "excerpt": "Frameworks, um Operations, Automationen und Analytics standortübergreifend zu vereinen.",
                    "content": [
                        "Mit jedem neuen Standort steigt die Komplexität. asyncz bündelt Regeln zentral, damit jedes Team dem gleichen Playbook folgt.",
                        "Definiere Services, Verfügbarkeiten und Ausnahmen einmalig. asyncz spielt sie automatisch auf alle Standorte aus.",
                        "Analytics zeigen Auslastung, Nachfrage und Engpässe, bevor sie den Kundendienst treffen."
                    ],
                    "category": "Produkt",
                    "author": "Asyncz Redaktion",
                    "published": "2025-09-10",
                    "readingTime": "Lesezeit 6 Minuten",
                    "tags": ["terminplanung", "ki", "filialen"]
                },
                {
                    "slug": "asyncz-automation-blueprint",
                    "title": "Automations-Blueprint gegen No-Shows",
                    "excerpt": "Schablonen, die Kalender füllen und Kunden verbindlich halten.",
                    "content": [
                        "Kombiniere Bestätigungen, Zahlungsregeln und Reminder, um No-Shows drastisch zu reduzieren.",
                        "asyncz versendet Erinnerungen über WhatsApp, SMS oder E-Mail – je nach Präferenz des Kunden.",
                        "Definiere Eskalationen für wichtige Termine und aktiviere automatisch Wartelisten-Einladungen."
                    ],
                    "category": "Operationen",
                    "author": "Asyncz Customer Success",
                    "published": "2025-08-22",
                    "readingTime": "Lesezeit 5 Minuten",
                    "tags": ["automation", "no-shows", "kundenbindung"]
                },
                {
                    "slug": "multi-branch-analytics-guide",
                    "title": "Analytics-Leitfaden für Betreiber",
                    "excerpt": "Dashboards und Kennzahlen, mit denen asyncz-Kunden wachsen.",
                    "content": [
                        "asyncz beleuchtet Conversion-, Retention- und Rebooking-Trends statt nur einfache Zählungen.",
                        "Vergleiche Standorte hinsichtlich Auslastung, Personaleffizienz und Kanalperformance.",
                        "Nutze diese Erkenntnisse für Marketing- und Einstellungsplanung, um die richtigen Gäste zu gewinnen."
                    ],
                    "category": "Wachstum",
                    "author": "Asyncz Datenteam",
                    "published": "2025-08-05",
                    "readingTime": "Lesezeit 7 Minuten",
                    "tags": ["analytics", "wachstum", "dashboard"]
                }
            ]
        }
    },
    "fr": {
        "navigation": {"blog": "Blog"},
        "contact": {"goToContactPage": "Voir la page contact"},
        "locationSpotlight": {
            "tagline": "Expertise locale",
            "title": "asyncz pour les équipes en France",
            "description": "Synchronisez vos agences de Paris à Lyon grâce à des parcours de réservation localisés, des règles fiscales et des automatisations adaptées à chaque région.",
            "ctaLabel": "Rencontrer notre équipe France",
            "ctaHref": "/contact",
            "highlights": [
                {
                    "icon": "map",
                    "title": "Conformité régionale automatique",
                    "description": "Gérez jours fériés, TVA et contraintes de service de chaque région sans dupliquer vos calendriers."
                },
                {
                    "icon": "users",
                    "title": "Support bilingue FR/EN",
                    "description": "Des spécialistes accompagnent vos accueils pendant tout le déploiement."
                }
            ]
        },
        "notFound": {
            "tagline": "Vous avez trouvé un créneau vide",
            "title": "Cette page n'est pas planifiée",
            "subtitle": "Le lien suivi n'existe plus. Découvrez les ressources asyncz pour revenir au planning.",
            "primaryCta": "Retour à l'accueil",
            "secondaryCta": "Contacter le support",
            "linkDescription": "En savoir plus sur {section}.",
            "explore": "Explorer"
        },
        "featuresPage": {
            "pageTitle": "Fonctionnalités - asyncz | Flux de planification IA",
            "metaDescription": "Découvrez les fonctionnalités d'asyncz : orchestration multi-sites, protection blacklist, tableaux d'analytics et listes d'attente IA.",
            "keywords": [
                "fonctionnalités asyncz",
                "planification ia",
                "automatisation liste d'attente",
                "calendrier multi-site",
                "analytique asyncz"
            ],
            "tagline": "Parcours produit",
            "heroTitle": "Orchestration tout-en-un pour chaque parcours de rendez-vous",
            "heroSubtitle": "asyncz unifie la réservation, le routage, les rappels et les insights pour offrir une expérience homogène dans chaque agence.",
            "primaryCta": "Comparer les forfaits",
            "secondaryCta": "Parler à nos experts",
            "coreTitle": "Des capacités clés qui suivent votre croissance",
            "coreDescription": "Des calendriers intelligents aux communications personnalisées, asyncz simplifie les opérations complexes sans ajouter de charge.",
            "deepDives": [
                {
                    "title": "Planification de capacité multi-sites",
                    "description": "Équilibrez la demande avec des fenêtres de disponibilité, des règles de déplacement et des seuils d'équipe."
                },
                {
                    "title": "Flux de communication automatisés",
                    "description": "Déclenchez confirmations, rappels et suivis via WhatsApp, SMS et email sans relances manuelles."
                },
                {
                    "title": "Contrôles d'accès selon les rôles",
                    "description": "Offrez aux sièges, responsables et accueils les bons outils sans sacrifier la sécurité."
                }
            ],
            "deepDiveTitle": "Approfondissez les flux essentiels",
            "deepDiveDescription": "asyncz cartographie chaque étape du parcours client afin qu'aucune opportunité ne se perde.",
            "analyticsHighlight": {
                "title": "Analyses opérationnelles en temps réel",
                "description": "Suivez l'utilisation, l'impact des absences et le chiffre d'affaires par ressource avec des tableaux conçus pour les marques de services.",
                "metrics": [
                    "Performance des agences et collaborateurs en un coup d'œil",
                    "Raisons d'annulation avec actions correctives",
                    "Attribution marketing et tendances de conversion"
                ]
            },
            "waitlistHighlight": {
                "title": "Liste d'attente IA qui remplit chaque créneau",
                "description": "asyncz propose le client idéal selon ses préférences, le temps de trajet et l'historique de dépenses pour exploiter chaque créneau.",
                "metric": "Jusqu'à 27 % de créneaux non remplis en moins dans les réseaux pilotes."
            },
            "differentiatorTitle": "Pourquoi asyncz dépasse les outils génériques",
            "differentiatorDescription": "Des workflows conçus pour votre secteur maintiennent les équipes multi-sites alignées tout en bloquant les absences et le trafic indésirable.",
            "differentiators": [
                {
                    "title": "Protection blacklist de niveau entreprise",
                    "description": "Détectez les répétitions via email, téléphone et paiement pour sécuriser vos agendas."
                },
                {
                    "title": "Analyses intégrées pour chaque rôle",
                    "description": "Chaque équipe visualise les indicateurs dont elle a besoin sans tableurs."
                },
                {
                    "title": "API prête dès le premier jour",
                    "description": "Synchronisez disponibilités avec vos applications et marketplaces via webhooks sécurisés."
                },
                {
                    "title": "Expériences localisées",
                    "description": "Servez vos clients dans six langues avec contenu, notifications et pages SEO prêtes."
                }
            ],
            "finalCtaTitle": "Prêt à orchestrer chaque rendez-vous avec asyncz ?",
            "finalCtaDescription": "Notre équipe modélise vos agences, automatisations et tableaux de bord en moins d'une semaine.",
            "finalPrimaryCta": "Planifier une session stratégique",
            "finalSecondaryCta": "Lire les témoignages clients"
        },
        "contactPage": {
            "pageTitle": "Contact asyncz | Planifier une session stratégique",
            "metaDescription": "Contactez asyncz pour une démo, les tarifs ou le support. Appelez le +1 (415) 555-0134, écrivez à info@asyncz.com ou rendez-vous à notre bureau de San Francisco.",
            "keywords": [
                "contact asyncz",
                "support asyncz",
                "téléphone asyncz",
                "email asyncz"
            ],
            "tagline": "Construisons ensemble votre avantage planning",
            "heroTitle": "Connectez-vous avec l'équipe asyncz",
            "heroSubtitle": "Partagez vos objectifs et nous préparerons un plan de déploiement pour vos agences, équipes et clients.",
            "formTitle": "Envoyez-nous un message",
            "formSubtitle": "Dites-nous comment aider et nous répondrons sous un jour ouvré.",
            "form": {
                "name": "Nom complet",
                "namePlaceholder": "Camille Dupont",
                "email": "Email professionnel",
                "emailPlaceholder": "camille@votreentreprise.fr",
                "company": "Entreprise",
                "companyPlaceholder": "Nom de l'organisation",
                "phone": "Téléphone (optionnel)",
                "phonePlaceholder": "+33 1 23 45 67 89",
                "topic": "Sujet",
                "topicPlaceholder": "Choisir un sujet",
                "topics": [
                    "Démo produit",
                    "Question sur les tarifs",
                    "Support d'onboarding",
                    "Opportunité de partenariat",
                    "Presse"
                ],
                "message": "Comment pouvons-nous aider ?",
                "messagePlaceholder": "Partagez le contexte, l'échéance et les agences à activer...",
                "securityQuestion": "Combien font {a} + {b} ? (anti-spam)",
                "securityPlaceholder": "Saisir la réponse",
                "submit": "Envoyer le message",
                "success": "Merci ! Nous vous répondrons sous un jour ouvré.",
                "error": "Une erreur est survenue. Merci de réessayer."
            },
            "infoTitle": "Visitez notre siège",
            "hoursTitle": "Heures de support (heure du Pacifique)",
            "supportTitle": "Support et accompagnement",
            "supportDescription": "Chaque offre asyncz inclut un onboarding guidé, des audits d'automatisation et du coaching opérationnel.",
            "supportItems": {
                "enterprise": "Spécialistes du déploiement multi-sites",
                "email": "Boîte dédiée avec réponse en moins de 24 h",
                "training": "Sessions en direct et parcours de certification"
            },
            "days": {
                "monday": "Lundi",
                "tuesday": "Mardi",
                "wednesday": "Mercredi",
                "thursday": "Jeudi",
                "friday": "Vendredi",
                "saturday": "Samedi",
                "sunday": "Dimanche"
            }
        },
        "blog": {
            "pageTitle": "Blog asyncz | Idées de planification intelligente",
            "metaDescription": "Découvrez les insights asyncz sur la planification par IA, les workflows d'automatisation et l'analytique multi-sites.",
            "keywords": [
                "blog asyncz",
                "idées planification ia",
                "opérations multi-sites",
                "automatisation asyncz"
            ],
            "tagline": "Idées pour les équipes de services modernes",
            "heroTitle": "Intelligence de planification pour chaque agence",
            "heroSubtitle": "Guides, frameworks et benchmarks pour les responsables opérations qui veulent des parcours clients fiables.",
            "categories": ["Produit", "Opérations", "Croissance"],
            "allLabel": "Tous les sujets",
            "readMore": "Lire l’article",
            "emptyState": "Aucun article ne correspond encore à ce filtre.",
            "articleNotFoundTitle": "Article introuvable",
            "articleNotFoundDescription": "Ce contenu n’est peut-être plus disponible. Consultez plutôt nos dernières publications.",
            "backToBlog": "Retour au blog",
            "posts": [
                {
                    "slug": "ai-scheduling-playbook",
                    "title": "Playbook de planification IA pour réseaux multi-sites",
                    "excerpt": "Des frameworks pour aligner opérations, automatisations et analytique dans toutes vos agences.",
                    "content": [
                        "Quand votre réseau s'étend, la complexité explose. asyncz centralise les règles pour que chaque site suive le même playbook.",
                        "Commencez par cartographier services, règles de disponibilité et exceptions. Avec asyncz, vous les appliquez une fois et les réutilisez partout.",
                        "Ajoutez l'analytique pour garder la direction informée de l'utilisation, de la demande et des goulots d'étranglement avant qu'ils n'affectent l'expérience client."
                    ],
                    "category": "Produit",
                    "author": "Équipe éditoriale d'Asyncz",
                    "published": "2025-09-10",
                    "readingTime": "Lecture 6 min",
                    "tags": ["planification ia", "playbook", "multi-site"]
                },
                {
                    "slug": "asyncz-automation-blueprint",
                    "title": "Blueprint d’automatisation : réduire les absences avec asyncz",
                    "excerpt": "Des modèles étape par étape pour garder un agenda plein et responsabiliser vos clients.",
                    "content": [
                        "Associez fenêtres de confirmation, règles de paiement et rappels pour réduire drastiquement les absences.",
                        "asyncz envoie des rappels via WhatsApp, SMS ou email selon le canal favori du client.",
                        "Définissez des escalades pour les rendez-vous critiques et déclenchez automatiquement les invitations de liste d'attente."
                    ],
                    "category": "Opérations",
                    "author": "Succès client asyncz",
                    "published": "2025-08-22",
                    "readingTime": "Lecture 5 min",
                    "tags": ["automatisation", "absences", "expérience client"]
                },
                {
                    "slug": "multi-branch-analytics-guide",
                    "title": "Guide analytique pour opérateurs multi-sites",
                    "excerpt": "Tableaux de bord et indicateurs suivis par les clients asyncz pour accroître l’utilisation et les revenus.",
                    "content": [
                        "Au-delà des volumes, asyncz met en lumière les tendances de conversion, de fidélisation et de rebooking qui prédisent le chiffre d'affaires.",
                        "Comparez chaque agence sur l'utilisation, l'efficacité des équipes et la performance des canaux pour cibler le coaching.",
                        "Réinjectez ces insights dans vos plans marketing et recrutement pour attirer les bons clients au bon moment."
                    ],
                    "category": "Croissance",
                    "author": "Équipe data asyncz",
                    "published": "2025-08-05",
                    "readingTime": "Lecture 7 min",
                    "tags": ["analytique", "croissance", "tableaux de bord"]
                }
            ]
        }
    },
    "tr": {
        "navigation": {"blog": "Blog"},
        "contact": {"goToContactPage": "İletişim sayfasını görüntüle"},
        "locationSpotlight": {
            "tagline": "Yerel uzmanlık",
            "title": "asyncz Türkiye ekipleri için",
            "description": "İstanbul'dan Ankara'ya kadar şubelerinizi yerelleştirilmiş rezervasyon deneyimleri, vergi kuralları ve bölgeye hazır otomasyonlarla senkronize edin.",
            "ctaLabel": "Türkiye ekibimizle iletişime geçin",
            "ctaHref": "/contact",
            "highlights": [
                {
                    "icon": "map",
                    "title": "Bölgesel uyumluluk otomatik",
                    "description": "Her il için resmi tatilleri, vergi türlerini ve hizmet kısıtlarını takvimleri çoğaltmadan yönetin."
                },
                {
                    "icon": "users",
                    "title": "İki dilli saha desteği",
                    "description": "Türkçe ve İngilizce uzmanlarımız resepsiyon ekiplerinizi tüm kurulum boyunca destekler."
                }
            ]
        },
        "notFound": {
            "tagline": "Boş bir zaman aralığı buldunuz",
            "title": "Bu sayfa planınızda yok",
            "subtitle": "Ulaştığınız bağlantı artık mevcut değil. Programınıza geri dönmek için asyncz kaynaklarını keşfedin.",
            "primaryCta": "Ana sayfaya dön",
            "secondaryCta": "Destekle iletişime geç",
            "linkDescription": "{section} hakkında daha fazla bilgi alın.",
            "explore": "Keşfet"
        },
        "featuresPage": {
            "pageTitle": "Özellikler - asyncz | Yapay zekâ destekli planlama akışları",
            "metaDescription": "asyncz özelliklerini keşfedin: çok şubeli orkestrasyon, kara liste koruması, analitik panolar ve yapay zekâ bekleme listeleri.",
            "keywords": [
                "asyncz özellikler",
                "yapay zekâ planlama",
                "bekleme listesi otomasyonu",
                "çok şubeli takvim",
                "asyncz analitik"
            ],
            "tagline": "Ürün turu",
            "heroTitle": "Her randevu akışı için tek platform",
            "heroSubtitle": "asyncz rezervasyon, yönlendirme, hatırlatmalar ve içgörüleri birleştirerek tüm şubelerde tutarlı hizmet sunar.",
            "primaryCta": "Paketleri karşılaştır",
            "secondaryCta": "Satış ekibiyle konuş",
            "coreTitle": "Şubelerinizle birlikte ölçeklenen temel yetenekler",
            "coreDescription": "Akıllı takvimlerden markalı iletişime kadar asyncz, ek iş gücüne ihtiyaç duymadan karmaşık operasyonları sadeleştirir.",
            "deepDives": [
                {
                    "title": "Çok lokasyonlu kapasite planlama",
                    "description": "Talebi uygunluk pencereleri, tampon süreler ve ekip limitleriyle dengeleyin."
                },
                {
                    "title": "Otomatik iletişim akışları",
                    "description": "Onay, hatırlatma ve takip mesajlarını WhatsApp, SMS ve e-posta üzerinden otomatik gönderin."
                },
                {
                    "title": "Role göre yetkilendirme",
                    "description": "Merkez, şube yöneticileri ve resepsiyon ekiplerine güvenliği bozmadan doğru araçları sağlayın."
                }
            ],
            "deepDiveTitle": "Önemli akışları yakından inceleyin",
            "deepDiveDescription": "asyncz müşteri yolculuğunun her adımını eşler; böylece hiçbir fırsat kaçmaz.",
            "analyticsHighlight": {
                "title": "Gerçek zamanlı operasyon analitiği",
                "description": "Hizmet markaları için tasarlanan panolarla kullanım oranını, no-show etkisini ve gelir performansını takip edin.",
                "metrics": [
                    "Şube ve ekip performansına hızlı bakış",
                    "İptal nedenleri ve önerilen aksiyonlar",
                    "Pazarlama kanalı ve kampanya dönüşüm trendleri"
                ]
            },
            "waitlistHighlight": {
                "title": "Yapay zekâlı bekleme listesi boş slotları doldurur",
                "description": "asyncz tercihleri, yol süresini ve harcama geçmişini analiz ederek davet edilecek en uygun müşteriyi önerir.",
                "metric": "Pilot şubelerde %27'ye varan boş slot azalışı."
            },
            "differentiatorTitle": "asyncz neden klasik araçlardan daha iyi?",
            "differentiatorDescription": "Sektöre özel iş akışları çok lokasyonlu ekipleri uyumlu tutarken spam ve tekrar eden no-showları engeller.",
            "differentiators": [
                {
                    "title": "Kurumsal seviye kara liste koruması",
                    "description": "E-posta, telefon ve ödeme kalıplarını tespit ederek riskli rezervasyonları durdurun."
                },
                {
                    "title": "Her rol için yerleşik içgörüler",
                    "description": "Ekipler ihtiyaç duydukları metrikleri tablolar arasında kaybolmadan görür."
                },
                {
                    "title": "İlk günden API hazır",
                    "description": "Özel uygulamalarınızı ve iş ortaklarınızı güvenli webhook ve REST API'lerle bağlayın."
                },
                {
                    "title": "Yerelleştirilmiş deneyimler",
                    "description": "Altı dilde içerik, bildirim ve SEO uyumlu sayfalar sunun."
                }
            ],
            "finalCtaTitle": "asyncz ile her randevuyu orkestre etmeye hazır mısınız?",
            "finalCtaDescription": "Ekibimiz şubelerinizi, otomasyonlarınızı ve analitiklerinizi bir haftadan kısa sürede haritalandırır.",
            "finalPrimaryCta": "Strateji oturumu planla",
            "finalSecondaryCta": "Müşteri hikayelerini oku"
        },
        "contactPage": {
            "pageTitle": "asyncz İletişim | Strateji oturumu planlayın",
            "metaDescription": "Demo, fiyat veya destek için asyncz ile iletişime geçin. +1 (415) 555-0134 numarasını arayın, info@asyncz.com adresine yazın veya San Francisco ofisimizi ziyaret edin.",
            "keywords": [
                "asyncz iletişim",
                "asyncz destek",
                "asyncz telefon",
                "asyncz email"
            ],
            "tagline": "Planlama avantajınızı birlikte kuralım",
            "heroTitle": "asyncz ekibiyle iletişime geçin",
            "heroSubtitle": "Hedeflerinizi paylaşın; şubeleriniz, ekipleriniz ve müşterileriniz için yol haritası çıkaralım.",
            "formTitle": "Bize mesaj gönderin",
            "formSubtitle": "Nasıl yardımcı olabileceğimizi paylaşın, bir iş günü içinde dönüş yapalım.",
            "form": {
                "name": "Tam ad",
                "namePlaceholder": "Ayşe Yılmaz",
                "email": "İş e-postası",
                "emailPlaceholder": "ayse@sirketiniz.com",
                "company": "Şirket",
                "companyPlaceholder": "Organizasyon adı",
                "phone": "Telefon (isteğe bağlı)",
                "phonePlaceholder": "+90 212 555 01 34",
                "topic": "Konu",
                "topicPlaceholder": "Konu seçin",
                "topics": [
                    "Ürün demosu",
                    "Fiyat sorusu",
                    "Onboarding desteği",
                    "Ortaklık fırsatı",
                    "Basın"
                ],
                "message": "Nasıl yardımcı olabiliriz?",
                "messagePlaceholder": "Bağlamı, zaman çizelgesini ve etkinleştirmek istediğiniz şubeleri paylaşın...",
                "securityQuestion": "{a} + {b} kaç eder? (spam koruması)",
                "securityPlaceholder": "Yanıtı girin",
                "submit": "Mesaj gönder",
                "success": "Teşekkürler! Bir iş günü içinde dönüş yapacağız.",
                "error": "Bir hata oluştu. Lütfen yeniden deneyin."
            },
            "infoTitle": "Merkezimizi ziyaret edin",
            "hoursTitle": "Destek saatleri (Pasifik Saati)",
            "supportTitle": "Destek ve onboarding",
            "supportDescription": "Her asyncz planı yönlendirmeli onboarding, otomasyon denetimleri ve koçluk içerir.",
            "supportItems": {
                "enterprise": "Çok lokasyonlu takımlar için yaygınlaştırma uzmanları",
                "email": "24 saat içinde dönüş yapılan özel e-posta",
                "training": "Canlı eğitimler ve sertifika programları"
            },
            "days": {
                "monday": "Pazartesi",
                "tuesday": "Salı",
                "wednesday": "Çarşamba",
                "thursday": "Perşembe",
                "friday": "Cuma",
                "saturday": "Cumartesi",
                "sunday": "Pazar"
            }
        },
        "blog": {
            "pageTitle": "asyncz Blog | Yapay zekâlı planlama fikirleri",
            "metaDescription": "Yapay zekâlı planlama, otomasyon iş akışları ve çok şubeli analitik üzerine asyncz içgörülerini okuyun.",
            "keywords": [
                "asyncz blog",
                "yapay zekâ planlama",
                "çok şubeli operasyon",
                "asyncz otomasyon"
            ],
            "tagline": "Modern hizmet ekipleri için içgörüler",
            "heroTitle": "Her şube için planlama zekâsı",
            "heroSubtitle": "Güvenilir müşteri yolculukları inşa etmek isteyen operasyon liderlerine yönelik oyun kitapları, çerçeveler ve kıyaslar.",
            "categories": ["Ürün", "Operasyon", "Büyüme"],
            "allLabel": "Tüm konular",
            "readMore": "Makaleyi oku",
            "emptyState": "Bu filtreyle eşleşen makale henüz yok.",
            "articleNotFoundTitle": "Makale bulunamadı",
            "articleNotFoundDescription": "İçerik yayından kaldırılmış olabilir. En yeni yazılara göz atın.",
            "backToBlog": "Bloga dön",
            "posts": [
                {
                    "slug": "ai-scheduling-playbook",
                    "title": "Çok şubeli ekipler için yapay zekâ planlama oyunu",
                    "excerpt": "Operasyonları, otomasyonları ve analitikleri tüm lokasyonlarda hizalamak için çerçeveler.",
                    "content": [
                        "Markanız büyüdükçe operasyonel karmaşıklık artar. asyncz, tüm şubelerin aynı playbook'u kullanması için kuralları merkezileştirir.",
                        "Hizmetleri, uygunluk kurallarını ve istisnaları haritalayın; asyncz bunları bir kez tanımlayıp her yerde uygular.",
                        "Yönetimin kullanım, talep ve darboğazları erken görmesi için analitik katmanını ekleyin."
                    ],
                    "category": "Ürün",
                    "author": "Asyncz Editör Ekibi",
                    "published": "2025-09-10",
                    "readingTime": "6 dakikalık okuma",
                    "tags": ["yapay zeka planlama", "oyun kitabı", "çok şube"]
                },
                {
                    "slug": "asyncz-automation-blueprint",
                    "title": "Otomasyon taslağı: asyncz ile no-showları azaltın",
                    "excerpt": "Takvimleri dolu tutmak ve müşterileri sorumlu kılmak için adım adım şablonlar.",
                    "content": [
                        "Onay pencereleri, ödeme kuralları ve hatırlatma ritimlerini bir araya getirerek no-showları ciddi oranda azaltın.",
                        "asyncz müşterilerin tercih ettiği kanallar üzerinden WhatsApp, SMS veya e-posta ile hatırlatma gönderir.",
                        "Önemli randevular için eskalasyon yolları belirleyin ve boşalan slotlarda bekleme listesi davetlerini otomatikleştirin."
                    ],
                    "category": "Operasyon",
                    "author": "Asyncz Müşteri Başarısı",
                    "published": "2025-08-22",
                    "readingTime": "5 dakikalık okuma",
                    "tags": ["otomasyon", "no-show", "müşteri deneyimi"]
                },
                {
                    "slug": "multi-branch-analytics-guide",
                    "title": "Çok şubeli yöneticiler için analitik rehberi",
                    "excerpt": "asyncz müşterilerinin kullanım ve gelir artışı için takip ettiği panolar ve metrikler.",
                    "content": [
                        "Basit sayımların ötesinde asyncz, gelir tahmin eden dönüşüm, sadakat ve yeniden rezervasyon trendlerini öne çıkarır.",
                        "Her şubeyi kullanım, ekip verimliliği ve kanal performansı açısından kıyaslayın.",
                        "Doğru müşterileri doğru zamanda kazanmak için bu içgörüleri pazarlama ve işe alım planlarınıza geri besleyin."
                    ],
                    "category": "Büyüme",
                    "author": "Asyncz Veri Ekibi",
                    "published": "2025-08-05",
                    "readingTime": "7 dakikalık okuma",
                    "tags": ["analitik", "büyüme", "panolar"]
                }
            ]
        }
    },
    "az": {
        "navigation": {"blog": "Bloq"},
        "contact": {"goToContactPage": "Əlaqə səhifəsinə baxın"},
        "locationSpotlight": {
            "tagline": "Yerli ekspertiza",
            "title": "asyncz Azərbaycan komandaları üçün",
            "description": "Bakıda və Gəncədə filiallarınızı lokal rezervasiya təcrübələri, vergi qaydaları və regiona hazır avtomatlaşdırmalarla sinxron saxlayın.",
            "ctaLabel": "Azərbaycan komandamızla tanış olun",
            "ctaHref": "/contact",
            "highlights": [
                {
                    "icon": "map",
                    "title": "Regional tələblərə uyğunluq",
                    "description": "Hər bölgənin bayramlarını, xidmət qaydalarını və vergi dərəcələrini təkrarlanmayan təqvimlərlə idarə edin."
                },
                {
                    "icon": "users",
                    "title": "İkidilli dəstək",
                    "description": "Onboarding mütəxəssislərimiz resepsiya komandanızı bütün proses boyu müşayiət edir."
                }
            ]
        },
        "notFound": {
            "tagline": "Boş vaxt yuvası tapdınız",
            "title": "Bu səhifə cədvəldə yoxdur",
            "subtitle": "Keçid artıq mövcud deyil. Asyncz resurslarını araşdırın və planınıza qayıdın.",
            "primaryCta": "Əsas səhifəyə qayıt",
            "secondaryCta": "Dəstək ilə əlaqə",
            "linkDescription": "{section} haqqında daha çox öyrənin.",
            "explore": "Araşdırın"
        },
        "featuresPage": {
            "pageTitle": "Funksiyalar - asyncz | AI ilə planlaşdırma axınları",
            "metaDescription": "asyncz funksiyalarını kəşf edin: çox filiallı orkestrasiya, qara siyahı qoruması, analitika panelləri və AI gözləmə siyahıları.",
            "keywords": [
                "asyncz funksiyalar",
                "ai planlaşdırma",
                "gözləmə siyahısı avtomatlaşdırması",
                "çox filiallı təqvim",
                "asyncz analitika"
            ],
            "tagline": "Məhsul turu",
            "heroTitle": "Hər görüş axını üçün vahid idarəetmə",
            "heroSubtitle": "asyncz bronlaşdırmanı, marşrutlaşdırmanı, xatırlatmaları və analitikanı birləşdirir ki, bütün filiallar eyni səviyyədə xidmət göstərsin.",
            "primaryCta": "Tarifləri müqayisə edin",
            "secondaryCta": "Satışla danışın",
            "coreTitle": "Filiallarınızla böyüyən əsas imkanlar",
            "coreDescription": "Ağıllı təqvimlərdən brend kommunikasiya kanallarına qədər asyncz əlavə resurs tələb etmədən mürəkkəb əməliyyatları sadələşdirir.",
            "deepDives": [
                {
                    "title": "Çox filiallı güc planlaması",
                    "description": "Tələbi əlçatanlıq pəncərələri, tampon qaydalar və heyət limitləri ilə tarazlayın."
                },
                {
                    "title": "Avtomatlaşdırılmış kommunikasiya axınları",
                    "description": "Təsdiqləri, xatırlatmaları və izləmələri WhatsApp, SMS və e-poçt vasitəsilə avtomatik göndərin."
                },
                {
                    "title": "Rol əsaslı girişlər",
                    "description": "Baş ofis, filial menecerləri və resepsiya komandalarına təhlükəsizlikdən ödün vermədən lazım olan alətləri verin."
                }
            ],
            "deepDiveTitle": "Ən vacib iş axınlarına daha dərindən baxın",
            "deepDiveDescription": "asyncz müştəri səyahətinin hər addımını xəritələyir ki, heç nə diqqətdən yayınmasın.",
            "analyticsHighlight": {
                "title": "Real vaxt əməliyyat analitikası",
                "description": "Xidmət markaları üçün hazırlanmış panellərlə istifadəni, no-show təsirini və resurs başına gəliri izləyin.",
                "metrics": [
                    "Filial və əməkdaş performansının sürətli görünüşü",
                    "Ləğv səbəbləri və bərpa təklifləri",
                    "Marketinq kanalı üzrə konversiya tendensiyaları"
                ]
            },
            "waitlistHighlight": {
                "title": "AI gözləmə siyahısı boş yerləri doldurur",
                "description": "asyncz seçimlərə, məsafəyə və xərcləmə tarixçəsinə əsaslanaraq dəvət ediləcək ən uyğun müştərini təklif edir.",
                "metric": "Pilot filiallarda boş slotların orta hesabla 27% azalması."
            },
            "differentiatorTitle": "asyncz niyə standart rezervasiya alətlərindən üstündür",
            "differentiatorDescription": "Sektora uyğun iş axınları çox filiallı komandaları sinxron saxlayır və spam trafiki ilə təkrarçı no-showları bloklayır.",
            "differentiators": [
                {
                    "title": "Enterprise səviyyəli qara siyahı qoruması",
                    "description": "Email, telefon və ödəniş nümunələrini təhlil edərək riskli rezervasiyaları dayandırın."
                },
                {
                    "title": "Hər rol üçün daxili analitika",
                    "description": "Komandalar ehtiyac duyduqları göstəriciləri cədvəllər arasında itirmədən görür."
                },
                {
                    "title": "İlk gündən API hazır",
                    "description": "Öz tətbiqlərinizi və partnyor platformalarını təhlükəsiz webhook və REST API-lərlə sinxronlaşdırın."
                },
                {
                    "title": "Lokallaşdırılmış təcrübələr",
                    "description": "Altı dildə məzmun, bildiriş və SEO optimallaşdırılmış səhifələr təqdim edin."
                }
            ],
            "finalCtaTitle": "Hər görüşü asyncz ilə idarə etməyə hazırsınız?",
            "finalCtaDescription": "Komandamız filiallarınızı, avtomatlaşdırmalarınızı və analitikanızı bir həftədən az müddətdə xəritələndirir.",
            "finalPrimaryCta": "Strategiya sessiyası sifariş edin",
            "finalSecondaryCta": "Müştəri hekayələrini oxuyun"
        },
        "contactPage": {
            "pageTitle": "asyncz ilə əlaqə | Strategiya sessiyası təyin edin",
            "metaDescription": "Demo, qiymət və ya dəstək üçün asyncz ilə əlaqə saxlayın. +1 (415) 555-0134 nömrəsinə zəng edin, info@asyncz.com ünvanına yazın və ya San-Fransiskodakı ofisimizi ziyarət edin.",
            "keywords": [
                "asyncz əlaqə",
                "asyncz dəstək",
                "asyncz telefon",
                "asyncz email"
            ],
            "tagline": "Planlaşdırma üstünlüyünüzü birlikdə quraq",
            "heroTitle": "asyncz komandası ilə əlaqə saxlayın",
            "heroSubtitle": "Hədəflərinizi bölüşün, filiallar, komandalar və müştərilər üçün uyğun plan hazırlayaq.",
            "formTitle": "Bizə mesaj göndərin",
            "formSubtitle": "Necə kömək edə biləcəyimizi deyin, bir iş günü ərzində cavab verəcəyik.",
            "form": {
                "name": "Tam ad",
                "namePlaceholder": "Nigar Məmmədova",
                "email": "İş e-poçtu",
                "emailPlaceholder": "nigar@sirketiniz.az",
                "company": "Şirkət",
                "companyPlaceholder": "Təşkilatınızın adı",
                "phone": "Telefon (istəyə bağlı)",
                "phonePlaceholder": "+994 50 123 45 67",
                "topic": "Mövzu",
                "topicPlaceholder": "Mövzu seçin",
                "topics": [
                    "Məhsul demosu",
                    "Qiymət sualı",
                    "Onboarding dəstəyi",
                    "Partnyorluq imkanı",
                    "Mətbuat"
                ],
                "message": "Necə kömək edə bilərik?",
                "messagePlaceholder": "Məzmunu, vaxt qrafikini və aktivləşdirmək istədiyiniz filialları paylaşın...",
                "securityQuestion": "{a} + {b} nə qədərdir? (spam qoruması)",
                "securityPlaceholder": "Cavabı daxil edin",
                "submit": "Mesaj göndərin",
                "success": "Təşəkkürlər! Bir iş günü ərzində geri dönəcəyik.",
                "error": "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."
            },
            "infoTitle": "Baş ofisimizə gəlin",
            "hoursTitle": "Dəstək saatları (Sakit okean vaxtı)",
            "supportTitle": "Dəstək və onboarding",
            "supportDescription": "Hər asyncz planı yönləndirilən onboarding, avtomatlaşdırma yoxlamaları və əməliyyat kouçinqini əhatə edir.",
            "supportItems": {
                "enterprise": "Çox filiallı komandalar üçün tətbiq mütəxəssisləri",
                "email": "24 saatdan az cavab müddətli xüsusi e-poçt",
                "training": "Canlı təlimlər və sertifikat proqramları"
            },
            "days": {
                "monday": "Bazar ertəsi",
                "tuesday": "Çərşənbə axşamı",
                "wednesday": "Çərşənbə",
                "thursday": "Cümə axşamı",
                "friday": "Cümə",
                "saturday": "Şənbə",
                "sunday": "Bazar"
            }
        },
        "blog": {
            "pageTitle": "asyncz Bloqu | AI planlaşdırma fikirləri",
            "metaDescription": "AI planlaşdırması, avtomatlaşdırma axınları və çox filiallı analitika haqqında asyncz məqalələrini oxuyun.",
            "keywords": [
                "asyncz bloq",
                "ai planlaşdırma",
                "çox filiallı əməliyyat",
                "asyncz avtomatlaşdırma"
            ],
            "tagline": "Müasir xidmət komandaları üçün məzmun",
            "heroTitle": "Hər filial üçün planlaşdırma intellekti",
            "heroSubtitle": "Etibarlı müştəri səyahətləri qurmaq istəyən əməliyyat liderləri üçün təlimatlar, çərçivələr və göstəricilər.",
            "categories": ["Məhsul", "Əməliyyat", "Böyümə"],
            "allLabel": "Bütün mövzular",
            "readMore": "Məqaləni oxu",
            "emptyState": "Bu filtrə uyğun məqalə hələ yoxdur.",
            "articleNotFoundTitle": "Məqalə tapılmadı",
            "articleNotFoundDescription": "Bu yazı silinmiş ola bilər. Ən son materiallara baxın.",
            "backToBlog": "Bloqa qayıdın",
            "posts": [
                {
                    "slug": "ai-scheduling-playbook",
                    "title": "Çox filiallı komandalar üçün AI planlaşdırma rəhbəri",
                    "excerpt": "Operasiyaları, avtomatlaşdırmanı və analitikanı hər yerdə uyğunlaşdırmaq üçün çərçivələr.",
                    "content": [
                        "Şəbəkəniz böyüdükcə əməliyyat mürəkkəbliyi artır. asyncz qaydaları mərkəzləşdirir ki, hər filial eyni playbook ilə işləsin.",
                        "Xidmətləri, əlçatanlıq qaydalarını və istisnaları xəritələndirin; asyncz onları bir dəfə tətbiq edib bütün filiallara ötürür.",
                        "İstifadə, tələbat və dar boğazları erkən görmək üçün analitikanı əlavə edin ki, müştəri təcrübəsi zərər görməsin."
                    ],
                    "category": "Məhsul",
                    "author": "Asyncz redaksiya komandası",
                    "published": "2025-09-10",
                    "readingTime": "6 dəqiqəlik oxu",
                    "tags": ["ai planlaşdırma", "oyun kitabçası", "çox filial"]
                },
                {
                    "slug": "asyncz-automation-blueprint",
                    "title": "Avtomatlaşdırma planı: asyncz ilə no-show-ları azaldın",
                    "excerpt": "Təqvimləri doldurmaq və müştəriləri məsuliyyətli saxlamaq üçün addım-addım şablonlar.",
                    "content": [
                        "Təsdiq pəncərələrini, ödəniş qaydalarını və xatırlatma ritmlərini birləşdirərək no-show riskini minimuma endirin.",
                        "asyncz müştərilərin üstünlük verdiyi kanallar vasitəsilə WhatsApp, SMS və email mesajları göndərir.",
                        "Ən dəyərli görüşlər üçün eskalasiya yolları qurun və boşalan yerlər üçün gözləmə siyahısı dəvətlərini avtomatlaşdırın."
                    ],
                    "category": "Əməliyyat",
                    "author": "Asyncz Müştəri Uğuru",
                    "published": "2025-08-22",
                    "readingTime": "5 dəqiqəlik oxu",
                    "tags": ["avtomatlaşdırma", "no-show", "müştəri təcrübəsi"]
                },
                {
                    "slug": "multi-branch-analytics-guide",
                    "title": "Çox filiallı operatorlar üçün analitika bələdçisi",
                    "excerpt": "asyncz müştəriləri istifadəni və gəlirliliyi artırmaq üçün hansı panel və göstəriciləri izləyir.",
                    "content": [
                        "Sadə sayımlardan kənara çıxaraq asyncz dönüşüm, saxlanma və yenidən rezervasiya trendlərini önə çıxarır.",
                        "Hər filialı istifadə, heyət səmərəliliyi və kanal performansı üzrə müqayisə edin.",
                        "Doğru müştəriləri doğru zamanda cəlb etmək üçün bu insights-ları marketinq və işə qəbul planlarınıza tətbiq edin."
                    ],
                    "category": "Böyümə",
                    "author": "Asyncz Data komandası",
                    "published": "2025-08-05",
                    "readingTime": "7 dəqiqəlik oxu",
                    "tags": ["analitika", "böyümə", "panel"]
                }
            ]
        }
    }
}

# Additional localized content for other languages will be merged below.

def merge(target, updates):
    for key, value in updates.items():
        if isinstance(value, dict):
            node = target.setdefault(key, {})
            if isinstance(node, dict):
                merge(node, value)
            else:
                target[key] = deepcopy(value)
        else:
            target[key] = value

def update_locale(lang, updates):
    path = f"src/locales/{lang}.json"
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    merge(data, updates)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

for lang, updates in translations.items():
    update_locale(lang, updates)
