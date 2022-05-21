#### ___All commands have to be run at the project root___

# Package installation
```bash
npm install
```

# Project building 

## Compiles all source files.
```bash
make gen
```

## Launches analysis, tests and compilation.
```bash
make build
```

# Tests launch

## Executes all tests.
```bash
make test
```

## Executes given module tests.
```bash
TEST=MODULE_NAME make module_test
```

## Executes a given test (all tests if not precised).
```bash
[TEST=TEST_NAME] make one_test 
```

# Eslint analysis

## Launches eslint analysis on all files.
```bash
make analyse 
```

## Launches eslint analysis on a given file ('.ts' does not have to be precised).
```bash
ANALYSE_F=FILE_NAME make one_analyse 
```

# Parcel launch 

## Launches parcel on viewer.
```bash
make view
```	

# Repository cleaner 
```bash
make clean 
```	

# Projet Génération Procédurale

- [Sujet du projet](https://www.labri.fr/perso/renault/working/teaching/projets/2021-22-S6-Js-Robot.php)

- [Page sur thor](https://thor.enseirb-matmeca.fr/ruby/projects/projetss6-robot)
