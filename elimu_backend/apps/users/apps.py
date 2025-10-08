from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'elimu_backend.apps.users'
    verbose_name = 'User Management'

    def ready(self):
        import elimu_backend.apps.users.signals  # Import signals when app is ready
