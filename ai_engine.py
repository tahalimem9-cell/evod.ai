def get_ai_reply(message):
    message = message.lower()

    if "price" in message:
        return "Our service starts from $29/month."

    elif "service" in message:
        return "We build AI chatbots for businesses."

    elif "email" in message or "@" in message:
        return "Thanks! We will contact you soon."

    else:
        return "Welcome to Evod AI! How can I help you today?"   