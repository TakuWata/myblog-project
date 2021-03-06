#!/usr/bin/env python
import os
import sys
import pymysql
pymysql.install_as_MySQLdb()

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE",
                          "myblog.settings.common")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    print(sys.argv)
    try:
        if len(sys.argv) > 2:
            if sys.argv[2] == 'react':
                project_root = os.getcwd()
                os.chdir(os.path.join(project_root, 'front'))
                os.system('yarn build')
                os.chdir(project_root)
                sys.argv.pop(2)
    except IndexError:
        execute_from_command_line(sys.argv)
    else:
        execute_from_command_line(sys.argv)
