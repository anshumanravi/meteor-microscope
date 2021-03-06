Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('posts'); }
});



//routers
Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
  name: 'postPage',
  data: function() { 
  		return Posts.findOne(this.params._id); 
  }
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function() { 
		return Posts.findOne(this.params._id); 
	}
});


var requireLogin = function() { 
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) { 
			this.render(this.loadingTemplate);
		} else { 
			this.render('accessDenied');
		}
	} else {
		this.next(); 
	}
}



Router.route('/submit', {name: 'postSubmit'});

//filters
//dataNotFound hook
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});