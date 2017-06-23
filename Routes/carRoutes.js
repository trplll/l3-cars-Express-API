var express = require('express');


var routes = function(Car){
    var carRouter = express.Router();

    carRouter.route('/')
        .post(function(req, res){
            var car = new Car(req.body);


            car.save();
            res.status(201).send(car);

        })
        .get(function(req,res){

            var query = {};

            if(req.query.genre)
            {
                query.genre = req.query.genre;
            }
            Car.find(query, function(err,cars){
                if(err)
                    res.status(500).send(err);
                else
					   res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
                    res.json(cars);
            });
        });

    carRouter.use('/:carId', function(req,res,next){
        Car.findById(req.params.carId, function(err,car){
            if(err)
                res.status(500).send(err);
            else if(car)
            {
                req.car = car;
                next();
            }
            else
            {
                res.status(404).send('no car found');
            }
        });
    });
    carRouter.route('/:CarId')
        .get(function(req,res){

            res.json(req.car);

        })
        .put(function(req,res){
            req.car.brand = req.body.brand;
            req.car.model = req.body.model;
            req.car.engine = req.body.engine;
            req.car.horsepower = req.body.horsepower;
            req.car.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.car);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.car[p] = req.body[p];
            }

            req.car.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.car);
                }
            });
        })
        .delete(function(req,res){
            req.car.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return carRouter;
};

module.exports = routes;