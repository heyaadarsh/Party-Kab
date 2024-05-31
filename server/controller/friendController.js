import friendModel from "../model/friendModel.js";
import Friend from "../model/friendModel.js"

// import moment from "moment";
// async function getDate() {
//     try {
//       const doc = await friendModel.findOne(); // Example: Find a document
//       if (doc) {
//         // Format the date using moment.js
//         const formattedDate = moment(doc.dateOfBirth).format('DD-MM-YYYY');
//         // console.log(formattedDate); // Output the formatted date
//       } else {
//         console.log('Document not found');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   getDate();


// async function checkName() {
//     try {
//       const doc = await friendModel.find();
//       console.log(doc);
//       if (doc) {
//         const tempName = doc.name;
//         console.log(tempName);
//       } else {
//         console.log('Document not found');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }

//   }

//   checkName();

export const create = async (req, res) => {
    try {
        const friendData = new Friend(req.body);

        if (!friendData) {
            return res.status(404).json({ msg: "User data not found" });
        }

        // console.log(`This is ${req}`);


        const saveData = await friendData.save();
        res.status(200).json({ msg: "Connection Added Successfully" });

    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const getAll = async (req, res) => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Note: JavaScript months are 0-indexed
    const currentDay = today.getDate();
    try {
        const friendData = await Friend.aggregate([
            {
                $addFields: {
                    month: { $toInt: { $substr: ["$dateOfBirth", 5, 2] } },
                    day: { $toInt: { $substr: ["$dateOfBirth", 8, 2] } }
                }
            },
            // 2024-03-13T12:00:00Z
            // {
            //     $match: {
            //         $or: [
            //             { month: { $gt: currentMonth } },
            //             {
            //                 $and: [
            //                     { month: currentMonth },
            //                     { day: { $gte: currentDay } }
            //                 ]
            //             }
            //         ]
            //     }
            // },
            {
                $sort: { month: 1, day: 1 }
            }
        ]).exec();

        if (!friendData) {
            return res.status(404).json({ msg: "Friends List not Found!" })
        }
        res.status(200).json(friendData);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Friend.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "Friend not Found!" })
        }
        res.status(200).json(userExist);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Friend.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "Friend not Found!" })
        }
        const updatedData = await Friend.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ msg: "Connection Updated Successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Friend.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: "Friend not Found!" })
        }
        await Friend.findByIdAndDelete(id);
        res.status(200).json({ msg: "Connection Removed Successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}