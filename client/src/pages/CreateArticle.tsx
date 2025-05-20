import { useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import EmailLink from "@/components/EmailLink";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function CreateArticlePage() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: null as File | null,
    imagePreview: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const clearImage = () => {
    setFormData({
      ...formData,
      image: null,
      imagePreview: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // In a real app, this would send the data to an API endpoint
    console.log("Submitting article:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Article created successfully!");
      setLocation("/blog");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <SocialLinks />
      <EmailLink />

      <main className="pt-20">
        <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16 xl:px-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[#CCD6F6] mb-6 animate-in show">
              Create New Article
            </h1>
            <p
              className="text-[#8892B0] text-lg mb-12 animate-in show"
              style={{ animationDelay: "0.1s" }}
            >
              Share your knowledge and insights with the community.
            </p>

            <Card
              className="bg-[#112240] border border-[#1E3A5F] p-8 animate-in show"
              style={{ animationDelay: "0.2s" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#CCD6F6]">
                    Article Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a descriptive title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="bg-[#0A192F] border-[#1E3A5F] text-[#CCD6F6] focus:border-[#64FFDA]"
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-[#CCD6F6]">
                    Short Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    placeholder="Write a brief summary (1-2 sentences)"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                    className="bg-[#0A192F] border-[#1E3A5F] text-[#CCD6F6] focus:border-[#64FFDA] h-20"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-[#CCD6F6]">
                    Category
                  </Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#0A192F] border border-[#1E3A5F] text-[#CCD6F6] focus:border-[#64FFDA] rounded-md p-2"
                  >
                    <option value="">Select a category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Backend">Backend</option>
                    <option value="Animation">Animation</option>
                    <option value="Performance">Performance</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Data">Data</option>
                    <option value="UI/UX">UI/UX</option>
                  </select>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content" className="text-[#CCD6F6]">
                    Article Content
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Write your article content here..."
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    className="bg-[#0A192F] border-[#1E3A5F] text-[#CCD6F6] focus:border-[#64FFDA] min-h-[300px]"
                  />
                </div>

                {/* Feature Image */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-[#CCD6F6]">
                    Feature Image
                  </Label>

                  {formData.imagePreview ? (
                    <div className="relative">
                      <img
                        src={formData.imagePreview}
                        alt="Image preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-[#0A192F]/80 text-white hover:bg-[#0A192F]"
                        onClick={clearImage}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-[#1E3A5F] rounded-md p-8 text-center hover:border-[#64FFDA] transition-colors">
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Label
                        htmlFor="image"
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faUpload}
                          className="text-[#64FFDA] text-3xl mb-2"
                        />
                        <span className="text-[#8892B0]">
                          Click to upload an image
                        </span>
                        <span className="text-[#8892B0] text-xs mt-1">
                          (Max 2MB)
                        </span>
                      </Label>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-4 border-[#8892B0] text-[#8892B0] hover:bg-[#1E3A5F]"
                    onClick={() => setLocation("/blog")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 px-6"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0A192F]"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Publishing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <FontAwesomeIcon icon={faSave} className="mr-2" />
                        Publish Article
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Card>

            <div
              className="mt-8 bg-[#1E3A5F] p-4 rounded-lg text-center animate-in show"
              style={{ animationDelay: "0.3s" }}
            >
              <p className="text-[#CCD6F6] text-sm">
                Your article will be reviewed by our team before being
                published.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
