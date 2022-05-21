TSC = node_modules/.bin/tsc
JEST_CMD = npx jest
ESLINT_CMD = npx eslint
PARCEL_CMD = npx parcel
PUB_D = public
SRC_D = src
TST_D = tests

# For 'one_test' rules.
TEST ?=

# For 'module_test' and 'module_analyze' rule.
MODULE ?=


.PHONY = test module_test one_test clean analyze one_analyze view clean


########### PROJECT BUILDING ###########

# Compiles all source files.
gen: ./${SRC_D}/main.ts
	@echo GEN
	./${TSC} $< --strict && mv ./${SRC_D}/*.js ./${PUB_D}

# Launches analysis, tests and compilation.
build: analyze test gen


########### TESTS ###########

# Executes all tests.
test:
	@echo TEST
	${JEST_CMD} ./${TST_D}

# Executes given module tests.
module_test:
	@echo MODULE_TEST
	${JEST_CMD} ./${TST_D}/${MODULE}

# Executes a given test.
one_test: 
	@echo ONE_TEST
	${JEST_CMD} ./${TST_D} -t ${TEST}


########### ESLINT ANALYSIS ###########

# Launches eslint analysis on all files.
analyze:
	@echo ANALYZE
	${ESLINT_CMD} ./${SRC_D}
	${ESLINT_CMD} ./${TST_D}

# Launches eslint analysis on a given module files.
module_analyze:
	@echo MODULE_ANALYZE
	${ESLINT_CMD} ./${SRC_D}/${MODULE}
	${ESLINT_CMD} ./${TST_D}/${MODULE}


########### PARCEL LAUNCH ###########

# Launches parcel on viewer.
view: ./${PUB_D}/index.html
	@echo VIEW
	@${PARCEL_CMD} ./${PUB_D}/index.html --dist-dir ./${PUB_D}/dist


########### CLEANER ###########

# Cleans repository.
clean:
	@echo CLEAN
	rm -Rf *~ ./${SRC_D}/*.js ./${PUB_D}/*.js
	