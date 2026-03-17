
import { Company } from "../models/companyModel.js"
import Cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";



export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: "false",
            })
        }
        let company = await Company.findOne({ name: companyName })
        if (company) {
            return res.status(400).json({
                message: "You can't register same Company.",
                seccess: false
            })
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        })

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Company registeration fall.",
            seccess: false
        })
    }
}

// get company ( only for logged in user(recruiter))
// export const getCompany = async (req,res) =>{
//     try{
//         const userId = req.id; // logged in user id
//          const companies = await Company.find({userId});
//          if(!companies){
//             return res.status(404).json({
//                 message:"Companies not found.",
//                 success:false,
//             })
//          }

//          return res.status(200).json({
//             companies,
//             success:true
//          })
//     }catch(error){
//         console.log(error)
//         return res.status(400).json({
//                 message:"Companies not found.",
//                 seccess:false
//             })
//     }
// }

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id

        const companies = await Company.find({ userId });

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// get company id
export const getCompanyById = async (req, res) => {
    try {

        const companyId = req.params.id;
        const company = await Company.findById(companyId)
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: "false"
            })
        }
        return res.status(200).json({
            company,
            success: true
        })

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

// export const updateCompany = async (req,res) =>{
//     try{

//         const {name, description, website, location} = req.body;
//         const file = req.file;
//         // later cloudinary work
//         const fileUri = getDataUri(file);
//         const cloudResponse = Cloudinary.uploader.upload(fileUri.content);
//         const logo = (await cloudResponse).secure_url

//         const updateData = {name, description, website, location, logo};

//         const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })

//         if(!company){
//             return res.status(404).json({
//                 message:"Company not found",
//                 success:false
//             })
//         }

//         return res.status(200).json({
//             message:"Company details updated successfully. ",
//             success:true
//         })
//     }catch(error){
//         console.log(error)
//     }
// }
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        const updateData = {
            name,
            description,
            website,
            location
        };

        /* ⭐ Upload Logo First */
        if (req.files?.file) {
            const fileUri = getDataUri(req.files.file[0]);

            const cloudResponse = await Cloudinary.uploader.upload(
                fileUri.content
            );

            updateData.logo = cloudResponse.secure_url;
        }

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company details updated successfully.",
            success: true,
            company
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};