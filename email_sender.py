import smtplib

def send_email(name,email):

    sender = "YOUR_EMAIL@gmail.com"
    password = "YOUR_APP_PASSWORD"

    message = f"""
    New Lead Captured

    Name: {name}
    Email: {email}
    """

    server = smtplib.SMTP("smtp.gmail.com",587)
    server.starttls()

    server.login(sender,password)

    server.sendmail(sender,sender,message)

    server.quit()