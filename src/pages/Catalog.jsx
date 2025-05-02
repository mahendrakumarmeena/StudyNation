// import React, { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
// import { useParams } from "react-router-dom"



// import Footer from "../component/common/Footer"
// import Course_Card from "../component/core/Catalog/Course_Card"
// import Course_Slider from "../component/core/Catalog/Course_Slider"
// import  apiConnector  from "../services copy/apiconnector"
// import { categories } from "../services copy/api"
// import getCatalogPageData from "../services copy/Opreration/pageAndComponntDatas"
// import Error from "./Error"

// function Catalog() {
//   const { loading } = useSelector((state) => state.profile)
//   const { catalogName } = useParams()
//   const [active, setActive] = useState(1)
//   const [catalogPageData, setCatalogPageData] = useState(null)
//   const [categoryId, setCategoryId] = useState("")

//   useEffect(() => {
//     ; (async () => {
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API)
//         const category_id = res?.data?.data?.filter(
//           (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
//         )[0]._id
//         setCategoryId(category_id)
//       } catch (error) {
//         console.log("Could not fetch Categories.", error)
//       }
//     })()
//   }, [catalogName])
//   useEffect(() => {
//     if (categoryId) {
//       ; (async () => {
//         try {
//           const res = await getCatalogPageData(categoryId)
//           setCatalogPageData(res)
//         } catch (error) {
//           console.log(error)
//         }
//       })()
//     }
//   }, [categoryId])

//   if (loading || !catalogPageData) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     )
//   }
//   if (!loading && !catalogPageData.success) {
//     return <Error />
//   }

//   return (
//     <>
//       {/* Hero Section */}
//       <div className=" box-content bg-richblack-800 px-4">
//         <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
//           <p className="text-sm text-richblack-300">
//             {`Home / Catalog / `}
//             <span className="text-yellow-25">
//               {catalogPageData?.data?.selectedCategory?.name}
//             </span>
//           </p>
//           <p className="text-3xl text-richblack-5">
//             {catalogPageData?.data?.selectedCategory?.name}
//           </p>
//           <p className="max-w-[870px] text-richblack-200">
//             {catalogPageData?.data?.selectedCategory?.description}
//           </p>
//         </div>
//       </div>

//       {/* Section 1 */}
//       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//         <div className="section_heading">Courses to get you started</div>
//         <div className="my-4 flex border-b border-b-richblack-600 text-sm">
//           <p
//             className={`px-4 py-2 ${active === 1
//               ? "border-b border-b-yellow-25 text-yellow-25"
//               : "text-richblack-50"
//               } cursor-pointer`}
//             onClick={() => setActive(1)}
//           >
//             Most Populer
//           </p>
//           <p
//             className={`px-4 py-2 ${active === 2
//               ? "border-b border-b-yellow-25 text-yellow-25"
//               : "text-richblack-50"
//               } cursor-pointer`}
//             onClick={() => setActive(2)}
//           >
//             New
//           </p>
//         </div>
//         <div>
//           <Course_Slider
//             Courses={catalogPageData?.data?.selectedCategory?.courses}
//           />
//         </div>
//       </div>
//       {/* Section 2 */}
//       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//         <div className="section_heading">
//           Top courses in {catalogPageData?.data?.differentCategory?.name}
//         </div>
//         <div className="py-8">
//           <Course_Slider
//             Courses={catalogPageData?.data?.differentCategory?.courses}
//           />
//         </div>
//       </div>

//       {/* Section 3 */}
//       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
//         <div className="section_heading">Frequently Bought</div>
//         <div className="py-8">
//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//             {catalogPageData?.data?.mostSellingCourses
//               ?.slice(0, 4)
//               .map((course, i) => (
//                 <Course_Card course={course} key={i} Height={"h-[400px]"} />
//               ))}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   )
// }

// export default Catalog


import React, { useEffect, useState } from 'react'
import Footer from '../component/common/Footer'
import { useParams } from 'react-router-dom'
import  apiConnector  from '../services copy/apiconnector';
import { categories } from '../services copy/api';
import  getCatalogaPageData  from '../services copy/Opreration/pageAndComponntDatas';
import Course_Card from '../component/core/Catalog/Course_Card';
import CourseSlider from '../component/core/Catalog/Course_Slider';
import { useSelector } from 'react-redux';

const Catalog = () => {

    const {catalogName} = useParams();
    
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(1)
    const [loading, setLoading] = useState(false)
    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            setLoading(true)
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("result ",res);
            
            const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName.split(" ").join("-").toLowerCase())[0]._id;
            console.log("category_id",category_id);

            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            setLoading(true)
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                if (res.success) {
                    setCatalogPageData(res);
                }
                else{
                    setCatalogPageData(null)
                }
                setLoading(false)
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);

    useEffect(() => {
      console.log("catalogPageData?.selectedCourses.course", catalogPageData?.data?.selectedCategory?.courses      )
      console.log("catalogPageData?.differentCourses.course", catalogPageData?.data?.differentCategory?.courses)
        console.log("catalogPageData?.mostSellingCourses.length ",catalogPageData?.data?.mostSellingCourses?.courses)
      
    }, [catalogPageData])
    
    
    if(loading){
        return (
        <div className=' h-screen flex justify-center items-center text-richblack-100 mx-auto  text-3xl'>
        <p>
                Loading...
        </p>
        </div>
    )}
    else{
        return (
            <>
                {
                    (!catalogPageData) ? 
                    (<div className=' text-center text-xl text-richblack-300 my-8'> No Courses for the category </div>) 
                    :(
                        <>    
            <div className=" box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                <p className="text-sm text-richblack-300">{`Home / Catalog / `}
                <span className="text-yellow-25">
                    {catalogPageData?.name}
                </span></p>
                <p className="text-3xl text-richblack-5"> {catalogPageData?.name} </p>
                <p className="max-w-[870px] text-richblack-200"> {catalogPageData?.description}</p>
                </div>
            </div>
        
            <div >
                {/* section1 */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">Courses to get you started</div>
                    <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                    className={`px-4 py-2 ${
                      active === 1
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer`}
                    onClick={() => setActive(1)}
                  >
                    Most Populer
                  </p>
                  <p
                    className={`px-4 py-2 ${
                      active === 2
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer`}
                    onClick={() => setActive(2)}
                  >
                    New
                  </p>
                    </div>
                    <div>
                        <CourseSlider Courses={catalogPageData?.data?.ectedCategory?.courses} />
                    </div>
                </div>  
        
                {/* section2 */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading">Checkout {catalogPageData?.differentCategory?.courses?.name} Courses Also</div>
                    <div className="py-8">
                        <CourseSlider Courses={catalogPageData?.data?.differentCategory?.course}/>
                        
                    </div>
                </div>
        
                {/* section3 */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="section_heading">Most Selling Courses</div>
                    <div className='py-8'>
        
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
                            {
                                catalogPageData?.data?.mostSellingCourses?.length === 0 ? (<p className=' text-xl text-white'>No Most selling courses</p>) : (catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                                .map((course, index) => (
                                    <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                                )))
                            }
        
                        </div>
        
                    </div>
                </div>
        
            </div>
             <Footer />
            </>
                    )
                }
            </>
        
            
          )
    }
}

export default Catalog