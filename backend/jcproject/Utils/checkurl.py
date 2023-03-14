import validators

def is_valid_url(url):
    """
    Check if a given URL is valid.

    Args:
        url (str): The URL to check.

    Returns:
        bool: True if the URL is valid, False otherwise.
    """
    if validators.url(url):
        return True
    else:
        return False
