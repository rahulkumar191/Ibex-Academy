const Admin = require('../models/admin');
const Course = require('../models/course');
const Instructor = require('../models/Instructor');

const jwtUtils = require('../utils/jwtUtils');


module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email, password: password });
    if (!admin) return res.status(404).json({ message: "email or password wrong" });
    const token = jwtUtils.generateJWT({ email: admin.email, role: 'admin', id: admin._id });
    res.json({ message: "Loged in successfully", token: token });
}

module.exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminExisting = await Admin.findOne({ email: email });

        if (adminExisting) {
            return res.status(403).json({ message: "Admin already exists" });
        }

        const newAdmin = new Admin(req.body);
        console.log('-->', newAdmin);
        const admin = await newAdmin.save();

        const token = jwtUtils.generateJWT({ email: admin.email, role: "admin", id: admin._id });

        res.json({ message: "Sign up successfully", token: token });
    } catch (err) {
        console.error("Error during admin signup:", err);
        res.status(500).json({ message: "An error occurred during signup", Error: err.message });
    }
}


module.exports.profile = async (req, res) => {
    if(req.user.role !== "admin"){
        return res.status(405).json({message: "Unauthorized access"});
    }
    try {
        const me = await Admin.findOne({ email: req.Admin.email });
        res.json(me);
    }
    catch (err) {
        console.log(req.user)
        res.json({ Error: err });
    }
}

module.exports.createCourse = async (req, res) => {
    if(req.user.role !== "admin"){
        return res.status(405).json({message: "Unauthorized access"});
    }
    
    const newCourse = new Course({
        title: 'Web Development Course',
        description: 'Learn HTML, CSS, JavaScript and more...',
        price: 99,
        oldPrice: 120,
        offer: 20,
        teacher: 'John Doe',
        image: 'course-image-url.jpg',
        language: 'English',
        highlights: ['HTML', 'CSS', 'JavaScript'],
        lectures: 54,
        mode: 'recorded',
        courseDetails: {
            learn: ['HTML', 'CSS', 'JavaScript'],
            basicDetails: [{
                title: 'Mode of the Course',
                value: 'Online Recorded Lecture'
              },
              {
                title: 'Technologies that you will Learn',
                value: 'HTML, CSS, JavaScript, MongoDB, Express.js, React.js, Node.js'
              }],
            courseContents: {
                chapters: [
                    {
                        title: 'HTML Basics',
                        topics: [
                            {
                                contentType: 1,
                                title: 'Setting up tools, Introduction to Web Development, Basics of HTML',
                                time: '2 hours',
                            },
                            // Add more topics as needed
                        ],
                    },
                    {
                        title: 'CSS Fundamentals',
                        topics: [
                            {
                                contentType: 1,
                                title: 'Introduction to CSS, Selectors, Styles and Layouts',
                                time: '3 hours',
                            },
                            // Add more topics as needed
                        ],
                    },
                    // Add more chapters as needed
                ],
            },
        },
    });

    // Save the new course to the database
    try {
        const savedCourse = await newCourse.save();
        res.json(savedCourse);
    }
    catch (err) {
        res.json({ error: err });
    }
}

// module.exports.editCourse = async(req, res) => {

// }

module.exports.addInstructor = async (req, res) => {
    const newInstructor = new Instructor({
        name: 'John Doe',
        image: 'instructor-image-url.jpg',
        description: 'John Doe is a web development expert with years of experience.',
        socialLinks: [
            {
                name: 'Twitter',
                url: 'https://twitter.com/johndoe',
                icon: 'fab fa-twitter',
            },
            {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/johndoe',
                icon: 'fab fa-linkedin',
            },
            // Add more social links as needed
        ],
    });

    try{
        const instructor = await newInstructor.save();
        res.json(instructor);
    }
    catch(err){
        res.json({error: err});
    }
}