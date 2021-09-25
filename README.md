# Pier (nodejs)

Server part of system monitor for Raspberry Pi 3.

GET /state

```
{
  "uptime": {
    "days": 8,
    "hours": 23
  },
  "mem": {
    "usage": 25.216637781629114,
    "top": [
      {
        "pid": 1019,
        "user": "pi",
        "pr": 31,
        "ni": 11,
        "virt": 817448,
        "res": 63168,
        "shr": 4768,
        "s": "S",
        "cpu": 0,
        "mem": 6.7,
        "time": "186:45.39",
        "cmd": "syncthing"
      },
      ...
    ],
    "swap": 100
  },
  "cpu": {
    "usage": 8.2999999999999972,
    "top": [
      {
        "pid": 1307,
        "user": "pi",
        "pr": 20,
        "ni": 0,
        "virt": 47492,
        "res": 896,
        "shr": 528,
        "s": "S",
        "cpu": 5.9,
        "mem": 0.1,
        "time": "12:46.76",
        "cmd": "syncthing"
      },
      ...
    ],
    "temp": 58.534
  },
  "disk": {
    "usage": 69
  },
  "net": [
    {
      "loss": 0,
      "min": 62.392,
      "avg": 63.113,
      "max": 64.279,
      "mdev": 0.856,
      "ts": 1632469435720
    },
    ...
  ]
}
```
