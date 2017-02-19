CURRENT = $(shell git rev-parse --short HEAD)

all: help

.PHONY: clean
clean:
	@find . -name *.py? -delete
	@rm -rf build dist *.egg-info

.PHONY: help
help:
	@echo "Please use \`make <target>\` where target one of"
	@echo " clean		to cleanup the package directory"
	@echo " install	to install requirements into environment"
	@echo " serv		to run dev server"
	@echo " test 		to run the test suite"
	@echo " watch		to enable livereload on assets changes"
	@echo " freeze		to freeze applicaion"
	@echo " gh-pages	to update gh-pages"

.PHONY: install
install:
	@pip install -r requirements/main.txt

.PHONY: serv
serv:
	@python setup.py serve -d -r -p 5009 --host '0.0.0.0'

.PHONY: lint
lint:
	standard
	stylelint -s less "work/static/stylesheets/**/*.less"

.PHONY: test
test: lint
	@python setup.py test -q

.PHONY: freeze
watch:
	@grunt watch

.PHONY: freeze
freeze:
	@python setup.py freeze

.PHONY: gh-pages
gh-pages:
	git checkout -b gh-pages-$(CURRENT)
	APP_CONFIG=$(PWD)/work/github.cfg python setup.py freeze
	git add -f gh-pages
	git rm -fr gh-pages/static/{vendor,.webassets-cache,.DS_Store}
	git commit --allow-empty -m "Update gh-pages at $(CURRENT)"
	git subtree split -P gh-pages -b gh-pages
	git push origin gh-pages:gh-pages --force
	git checkout -
	git branch -D gh-pages gh-pages-$(CURRENT)
