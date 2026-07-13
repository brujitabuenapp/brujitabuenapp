# Deploy a HostGator con GitHub Actions

## 1. Agregar secretos en GitHub
Ve a:
- GitHub → tu repo → Settings → Secrets and variables → Actions

Agrega estos secretos:
- `FTP_HOST` → `192.185.52.139`
- `FTP_USERNAME` → tu usuario FTP de HostGator
- `FTP_PASSWORD` → tu contraseña FTP de HostGator

## 2. Asegurarte de que la rama sea `main`
El workflow se ejecuta al hacer push a `main`.

## 3. Hacer el primer push
Ejecuta:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add HostGator FTP deployment workflow"
git push origin main
```

## 4. Ver el progreso
En GitHub entra a:
- Actions

Ahí verás si el deploy se ejecuta correctamente.

## 5. Si falla
Revisa:
- que el usuario FTP sea correcto,
- que la contraseña esté bien,
- y que el host permita conexión FTP en puerto 21.
