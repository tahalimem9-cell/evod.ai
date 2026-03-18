import sqlite3

conn = sqlite3.connect("leads.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS leads (
id INTEGER PRIMARY KEY,
name TEXT,
email TEXT
)
""")

conn.commit()
