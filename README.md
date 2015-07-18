# poco
The POCO C++ library dependency build. Provides a forked version of the poco library
with tooling to automate the build for use in other projects.

This version builds just the Release and Debug versions of the Foundation, Net, and
Util POCO components. It builds them as static libs, with statically linked MSVC
runtime libraries (vs120_xp/VS2013, WinXP-Compatible).

#### Building

To build, run the following command

    npm install && grunt jenkins

The output artifacts will be located under `build-artifacts/`

