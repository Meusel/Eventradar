from setuptools import setup, find_packages

setup(
    name="eventradarapp",
    version="0.1.0",
    description="Discover and explore events in Halle (Saale)",
    author="Henrald",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "flask",
    ],
    extras_require={
        "dev": ["pytest", "black"],
    },
    entry_points={
        "console_scripts": [
            "eventradar=app:app",  # optional, für CLI Start
        ],
    },
)

