ddescribe("Dashlet op-promo-list", function () {
	it('Debe de tener Hello World', function (argument) {
		expect(view).toBeTruthy()
		expect(view.$el.find('h1').html()).toContain("Hello World");
	});
});
