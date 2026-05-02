# Despliegue en Dokploy — Johann Abad Portfolio

> **Stack:** Next.js 16.2.4 · Docker Compose · Dokploy · Ubuntu VPS  
> **Dominio:** `abadgroup.tech`  
> **Repo:** https://github.com/Johann3421/Portafolio_profesional.git

---

## Variables de entorno

Copia y pega este bloque exacto en **Dokploy → Compose → Environment**:

```env
# ── Next.js ────────────────────────────────────────────────────────
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0

# ── URL pública (sin barra final) ──────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://abadgroup.tech

# ── SEO / Verificación Google Search Console ───────────────────────
# Reemplaza con tu código real obtenido en: https://search.google.com/search-console
NEXT_PUBLIC_GOOGLE_VERIFICATION=REPLACE_WITH_GOOGLE_VERIFICATION_CODE

# ── Google Tag Manager (opcional) ─────────────────────────────────
# Descomenta y reemplaza cuando tengas tu ID de GTM
# NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# ── WhatsApp (número para el botón flotante) ───────────────────────
# Formato internacional sin +, sin espacios: 573001234567
NEXT_PUBLIC_WHATSAPP_NUMBER=573000000000

# ── Contacto (si implementas API de email) ─────────────────────────
# RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXX
# CONTACT_EMAIL_TO=tu@email.com
```

> **Nota:** Las variables prefijadas con `NEXT_PUBLIC_` quedan embebidas en el build.  
> Si las cambias después del primer deploy, debes hacer **Redeploy** para que surtan efecto.

---

## Pasos de despliegue

### 1. Acceder a Dokploy

1. Abre tu panel Dokploy: `http://TU_IP_VPS:3000`
2. Inicia sesión con tu cuenta admin.

---

### 2. Crear el servicio Compose

1. En el menú lateral → **Projects** → selecciona tu proyecto (o crea uno nuevo).
2. Clic en **+ Create Service** → elige **Docker Compose**.
3. Asigna un nombre: `portafolio` (o el que prefieras).

---

### 3. Configurar el repositorio

En la pestaña **General** del servicio:

| Campo | Valor |
|-------|-------|
| **Source** | GitHub |
| **Repository** | `https://github.com/Johann3421/Portafolio_profesional.git` |
| **Branch** | `main` |
| **Compose File Path** | `./docker-compose.yml` |

> Si el repositorio es privado: ve a **Settings → Git → Add GitHub Account** y autoriza Dokploy antes de este paso.

---

### 4. Agregar variables de entorno

1. Pestaña **Environment** → clic en el área de texto.
2. Pega el bloque de la sección de arriba.
3. Reemplaza `REPLACE_WITH_GOOGLE_VERIFICATION_CODE` y `573000000000` con tus valores reales.
4. Clic **Save**.

> Dokploy inyecta estas variables al ejecutar `docker compose up`, por lo que el `docker-compose.yml` las recibe con la sintaxis `${VAR}` sin necesidad de ningún `.env` en el servidor.

---

### 5. Configurar el dominio

1. Pestaña **Domains** → clic **+ Add Domain**.
2. Completa los campos:

| Campo | Valor |
|-------|-------|
| **Host** | `abadgroup.tech` |
| **Service Name** | `portafolio` *(debe coincidir con el nombre en docker-compose.yml)* |
| **Port** | `3000` |
| **HTTPS** | ✅ Activado (Let's Encrypt) |
| **www redirect** | ✅ Activado (opcional) |

3. Antes de guardar, asegúrate de que el DNS de `abadgroup.tech` apunta a la IP de tu VPS:

```
Tipo  Nombre   Valor
A     @        TU_IP_VPS
A     www      TU_IP_VPS
```

---

### 6. Primer deploy

1. Pestaña **Deployments** → clic **Deploy**.
2. Dokploy ejecutará:
   - `git clone` / `git pull` del repo
   - `docker compose build` (multi-stage: deps → builder → runner)
   - `docker compose up -d`
   - Traefik asigna el dominio con SSL automáticamente

3. Sigue el log en tiempo real. La primera vez tarda **3–5 minutos** (descarga de capas de Node.js Alpine).

4. Al finalizar verás en los logs:

```
✔ Build successful
✔ Container portafolio started
✔ Domain assigned: https://abadgroup.tech
```

---

### 7. Verificar el despliegue

Abre en el navegador:

```
https://abadgroup.tech
https://abadgroup.tech/demos
https://abadgroup.tech/sitemap.xml
https://abadgroup.tech/robots.txt
```

Todos deben responder correctamente.

---

### 8. Deploys automáticos (CI/CD)

Para que cada `git push` despliegue automáticamente:

1. Pestaña **General** → sección **Auto Deploy** → activa el toggle.
2. Copia la **Webhook URL** que genera Dokploy.
3. En GitHub → tu repo → **Settings → Webhooks → Add webhook**:

| Campo | Valor |
|-------|-------|
| **Payload URL** | La URL copiada de Dokploy |
| **Content type** | `application/json` |
| **Events** | `Just the push event` |

Ahora cada `git push origin main` dispara un redeploy automático.

---

## Comandos útiles post-deploy

```bash
# Ver logs del servicio en tiempo real (desde el VPS, en la carpeta del proyecto)
docker compose logs -f portafolio

# Reiniciar el servicio
docker compose restart portafolio

# Ver estado de todos los servicios del compose
docker compose ps

# Ver uso de recursos
docker stats portafolio

# Redeploy manual forzado (rebuild sin caché)
docker compose build --no-cache && docker compose up -d
```

---

## Checklist final

- [ ] DNS `abadgroup.tech` apuntando a la IP del VPS
- [ ] Variables de entorno pegadas y guardadas en Dokploy
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` actualizado con número real
- [ ] `NEXT_PUBLIC_GOOGLE_VERIFICATION` actualizado con código real de Search Console
- [ ] Primer deploy exitoso
- [ ] HTTPS activo en `https://abadgroup.tech`
- [ ] `/sitemap.xml` accesible (para registrar en Google Search Console)
- [ ] Webhook de GitHub configurado para deploys automáticos
- [ ] PDF del CV subido a `/public/cv-johann-abad.pdf` y commiteado
- [ ] Imagen OG subida a `/public/og-image.png` (1200×630 px) y commiteada
