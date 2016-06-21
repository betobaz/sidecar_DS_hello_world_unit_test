ddescribe("Dashlet Hello World", function () {
	var moduleName = 'Cases';
	var viewName = 'hello-world';
	var layoutName = 'record-list';


	/*
	 * Variables shared by all tests
	 */
	 var app;
	 var view;
	 var layout;

	/**
	 * Called before each test below.  We use this function to setup (or mock up) the necessary pieces
	 * in order to test our Sidecar controller properly.
	 *
	 * Typically, we need to define Sugar view metadata and ensure that our controller JS file has been loaded
	 * by the Sidecar framework.  We utilize some SugarTest utility functions to accomplish this.
	 */
	beforeEach(function() {
		// Proxy for our typical Sidecar `app` object
		app = SugarTest.app;
		//Ensure test metadata is initialized
		SugarTest.testMetadata.init();
		//Load custom Handlebars template (usually optional)
		SugarTest.loadCustomHandlebarsTemplate(viewName, 'view', 'base');
		//Load custom component JS (required)
		SugarTest.loadCustomComponent('base', 'view', viewName);
		//Mock view metadata for our custom view (usually required)
		SugarTest.testMetadata.addViewDefinition(
			viewName,
			{
				'panels': [
				{
					fields: []
				}
				]
			},
			moduleName
		);
		//Commit custom metadata into Sidecar
		SugarTest.testMetadata.set();

		//Mock the Sidecar context object
		var context = app.context.getContext();
		context.set({
			module: moduleName,
			layout: layoutName
		});
		context.prepare();

		//Create parent layout for our view using fake context
		layout = app.view.createLayout({
			name: layoutName,
			context: context
		});

		//Create our custom View before each test
		view = app.view.createView({
			name : viewName,
			context : context,
			module : moduleName,
			layout: layout,
			platform: 'base'
		});
	});

	/**
	* Perform cleanup after each test.
	*/
	afterEach(function() {
		//Delete test metadata
		SugarTest.testMetadata.dispose();
		//Delete list of declared components
		app.view.reset();
		//Dispose of our view
		view.dispose();
	});

	it('Debe de tener Hello World', function (argument) {
		expect(view).toBeTruthy()
		expect(view.$el.find('h1').html()).toContain("Hello World");
	});
});
