# Port Check Commands — Terminal Reference

Commands for checking whether ports are busy on macOS/Linux.

---

## Check a Specific Port

| Command                            | Description                                                                                                    |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `lsof -i :3000`                    | Shows which process is using port **3000** (replace with any port). Empty output = port is free.               |
| `lsof -nP -iTCP:3000 -sTCP:LISTEN` | Same as above, but only **listening** TCP sockets with **numeric** IPs/ports (no DNS lookups).                 |
| `nc -zv localhost 3000`            | Tests if something accepts connections on port 3000. Success = open; "Connection refused" = nothing listening. |

---

## List All Busy (Listening) Ports

| Command                       | Description                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| `lsof -nP -iTCP -sTCP:LISTEN` | Lists **all TCP ports** currently in **LISTEN** state.                                    |
| `netstat -an \| grep LISTEN`  | Alternative way to see all **listening** ports (macOS & Linux).                           |
| `ss -tuln`                    | **Linux only** — shows all listening TCP (`-t`) and UDP (`-u`) ports with numeric output. |

---

## Check a Range of Ports

```bash
# Using lsof — reports BUSY or free
for port in {3000..3010}; do
  lsof -i :$port >/dev/null 2>&1 && echo "Port $port: BUSY" || echo "Port $port: free"
done
```
