<h1 align="center">Algoflex Compiler Infrastructure</h1> <br>

<p align="center">
    <a href="#">
        <img alt="Compiler image" title="Algoflex compiler" src="https://i.imgur.com/ULcKyu6.png" width="350">
    </a>
</p>

<p align="center">
    Best compiler. Ever.
</p>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Introduction](#introduction)
- [Core Technical Concepts](#core-technical-concepts)
- [Getting Started/Requirements/Prerequisites/Dependencies](#getting-startedrequirementsprerequisitesdependencies)
  - [Requirement and prerequisites](#requirement-and-prerequisites)
  - [Steps :](#steps-)
- [Contributing](#contributing)
  - [Code style](#code-style)
  - [Useful links](#useful-links)
- [TODO](#todo)
  - [Next steps](#next-steps)
  - [Features planned](#features-planned)
  - [Known bugs](#known-bugs)
- [Contact](#contact)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

![Infra status](https://img.shields.io/badge/compiler-under%20construction-orange)

## Introduction

This is an Ansible script to setup up and deploy easily Algoflex compiler server.

Principal features :

- Updating the server and install base packages
- Harden the server security
- Installing Docker
- Authentication to access the engine
- Forwarding of the request to the engine

More details in the technical concepts chapter.

## Core Technical Concepts

The script deploy and setup a compiler server for Algoflex. The script will use ansible to install docker and making its Engine API available by forwarding the external requests directly to it.

Common files :

- playbook.yml : calls the different roles
- production : contain the server informations
- ansible.cfg : ansible configuration

Roles :

- base : update server and secure ssh
- compiler : install Docker and configure authentication

## Getting Started/Requirements/Prerequisites/Dependencies

### Requirement and prerequisites

To setup the server the following are needed:

- Ansible installed on your client
- The IP address of the distant server to setup
- The password of the server (by default the script will try to connect to the root user)

### Steps :

- Access the production file at the root of the project
  1. Add the IP address of the server to the production file under **compiler** and **all**
  2. Still in the production file add the password in the **ansible_ssh_pass** password.

![production file](https://i.imgur.com/5roxld2.png)

Then save the file.

- Go at the root of the project and run the command below to start the configuration :

```bash
$ ansible-playbook playbook.yml
```

If everything went well and there was no errors, the server should be fully setup, up and running.

## Contributing

### Code style

[Conventionnal commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Useful links

[Docker Engine API doc](https://docs.docker.com/engine/api/v1.41/)

## TODO

### Next steps

- [ ] Authentication
- [ ] Forward requests to Docker Engine API

### Features planned

- [ ] Docker API

### Known bugs

- [ ] X

## Contact

Maintainers : [Hamza Ince](mailto:hamza.ince@epitech.eu) - [Maxime Lardier](mailto:maxime1.lardier@epitech.eu)
