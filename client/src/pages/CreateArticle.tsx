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

      <main className="pt-20 bg-custom-primary">
        <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16 xl:px-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-custom-secondary mb-6 animate-in show">
              Create New Article
            </h1>
            <p
              className="text-custom-accent2 text-lg mb-12 animate-in show"
              style={{ animationDelay: "0.1s" }}
            >
              Share your knowledge and insights with the community.
            </p>

            <Card
              className="bg-custom-primary-lighter border border-custom-accent1 p-8 animate-in show"
              style={{ animationDelay: "0.2s" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-custom-secondary">
                    Article Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a descriptive title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="bg-custom-primary border-custom-accent1 text-custom-secondary focus:border-custom-accent3"
                  />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-custom-secondary">
                    Short Excerpt
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    placeholder="Write a brief summary (1-2 sentences)"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    required
                    className="bg-custom-primary border-custom-accent1 text-custom-secondary focus:border-custom-accent3 h-20"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-custom-secondary">
                    Category
                  </Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-custom-primary border border-custom-accent1 text-custom-secondary focus:border-custom-accent3 rounded-md p-2"
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
                  <Label htmlFor="content" className="text-custom-secondary">
                    Article Content
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Write your article content here..."
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    className="bg-custom-primary border-custom-accent1 text-custom-secondary focus:border-custom-accent3 min-h-[300px]"
                  />
                </div>

                {/* Feature Image */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-custom-secondary">
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
                        className="absolute top-2 right-2 bg-custom-primary/80 text-custom-secondary hover:bg-custom-primary"
                        onClick={clearImage}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-custom-accent1 rounded-md p-8 text-center hover:border-custom-accent3 transition-colors">
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
                          className="text-custom-accent3 text-3xl mb-2"
                        />
                        <span className="text-custom-accent2">
                          Click to upload an image
                        </span>
                        <span className="text-custom-accent2 text-xs mt-1">
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
                    className="mr-4 border-custom-accent2 text-custom-accent2 hover:bg-custom-primary-lighter"
                    onClick={() => setLocation("/blog")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-custom-accent3 text-custom-primary hover:bg-custom-accent3/90 px-6"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-custom-primary"
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
              className="mt-8 bg-custom-accent1/30 p-4 rounded-lg text-center animate-in show"
              style={{ animationDelay: "0.3s" }}
            >
              <p className="text-custom-secondary text-sm">
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
