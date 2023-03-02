Relio package managerBasic Package Manager
=====================

This is a simple package manager written in C that can download and install packages for Java, Python, and Node.

Installation
------------

To use the package manager, you'll need to have the following installed on your system:

-   C compiler (such as GCC or Clang)
-   libcurl library (for downloading files over HTTP)
-   Java (for installing Java packages)
-   Python (for installing Python packages)
-   Node (for installing Node packages)

On Windows, you can install these dependencies using [Chocolatey](https://chocolatey.org/):


`choco install mingw curl jdk8 python nodejs`

On Mac, you can install them using [Homebrew](https://brew.sh/):

`brew install gcc curl openjdk python node`

Once you have the dependencies installed, you can compile the package manager using the following command:

`gcc -o pkgmgr pkgmgr.c -lcurl`

This will create an executable file named `pkgmgr` in the current directory.

Usage
-----

To use the package manager, you can run the `pkgmgr` executable with the following arguments:


`pkgmgr <language> <package> <version>`

Here's what each argument means:

-   `language`: The language of the package you want to install (either "Java", "Python", or "Node").
-   `package`: The name of the package you want to install.
-   `version`: The version of the package you want to install.

For example, to install version 1.0.0 of the "junit" package for Java, you would run:


`pkgmgr Java junit 1.0.0`

This would download the package from the Maven repository and install it to your local system.

Compatibility
-------------

This package manager has been tested on Windows 10 and macOS 12.0 (Monterey), but should work on other versions of those operating systems as well. Note that it has not been tested on Linux or other Unix-like systems. If you encounter any issues or have suggestions for improvement, please let us know by opening an issue in the project's GitHub repository.