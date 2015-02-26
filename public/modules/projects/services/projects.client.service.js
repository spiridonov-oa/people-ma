'use strict';

//Projects service used to communicate Projects REST endpoints
angular.module('projects').factory('ProjectsFactory', ['$resource',
	function($resource) {
        var projects = [
            {
            name: 'Project 1',
            image: '/images/projects/project-1.jpg',
            position: 1
            },
            {
                name: 'Project 2',
                image: '/images/projects/project-1.jpg',
                position: 2
            },
            {
                name: 'Project 3',
                image: '/images/projects/project-1.jpg',
                position: 3
            },
            {
                name: 'Project 4',
                image: '/images/projects/project-1.jpg',
                position: 4
            },
            {
                name: 'Project 5',
                image: '/images/projects/project-1.jpg',
                position: 5
            }
        ];
        var counter = 1;
        return {
            addProject: function (name, image, position, date) {
                projects.push({
                    id: counter,
                    name: name || Project,
                    image: image || 'image/projects/no_img.jpg',
                    position: position || 0,
                    date: date || Date.now
                });
                counter++;
            },
            removeProject: function () {

            },
            getProjects: function () {
                return  projects;
            }
        }
	}
]);