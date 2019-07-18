const initializeEndpoints = (app) => {

    const courses = [
        { id: 1, name: "course1" },
        { id: 2, name: "course2" },
        { id: 3, name: "course3" }
    ];

    /**
    * @swagger
    * /:
    *   get:
    *     description: test
    */
    app.get("/", (req, res) => {
        res.send("Hello Word odlir!!");
    });

    /**
    * @swagger
    * /api/courses:
    *   get:
    *     description: returns all courses
    */
    app.get("/api/courses", (req, res) => {
        res.send(courses);
    });

    app.get("/api/courses/:id", (req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if (!course) res.status(404).send("the course was not found!");
        res.send(course);
    });

    app.post("/api/courses", (req, res) => {
        const { error } = validateCourse(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        const course = {
            id: courses.length + 1,
            name: req.body.name
        };
        courses.push(course);
        res.send(course);
    });

    app.put("/api/courses/:id", (req, res) => {
        const course = courses.find(c => c.id === parseInt(req.params.id));
        if (!course) res.status(404).send("course not found");
        const { error } = validateCourse(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
    });

    function validateCourse(course) {
        const schema = {
            name: Joi.string()
                .min(3)
                .required()
        };
        return Joi.validate(course, schema);
    }
}

module.exports = initializeEndpoints;