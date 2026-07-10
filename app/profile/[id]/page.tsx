"use client";

import { useParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModal } from "@/context/ModalContext";
import { useRef, useState, useEffect } from "react";
import {
  MoreVertical,
  X,
  Briefcase,
  GraduationCap,
  Heart,
  MapPin,
  Home,
  Phone,
  Camera,
  UserPlus,
  UserMinus,
  UserCheck,
  MessageSquare,
  ThumbsUp,
  MessageCircle,
  Share,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { userServices } from "@/services/userServices";
import { postServices } from "@/services/postServices";
import { PostSkeleton } from "@/components/screens/MiddleBar/Components/PostSection";

// Edit Bio Modal Component
interface EditBioModalProps {
  currentBio: any;
  userId: string;
  onSave: () => void;
  onClose: () => void;
}

const EditBioModal: React.FC<EditBioModalProps> = ({ currentBio, userId, onSave, onClose }) => {
  const [bioText, setBioText] = useState(currentBio?.bioText || "");
  const [liveIn, setLiveIn] = useState(currentBio?.liveIn || "");
  const [relationShip, setRelationShip] = useState(currentBio?.relationShip || "");
  const [workPlace, setWorkPlace] = useState(currentBio?.workPlace || "");
  const [education, setEducation] = useState(currentBio?.education || "");
  const [phone, setPhone] = useState(currentBio?.phone || "");
  const [homeTown, setHomeTown] = useState(currentBio?.homeTown || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const response = await userServices.updateUserBio(userId, {
        bioText,
        liveIn,
        relationShip,
        workPlace,
        education,
        phone,
        homeTown,
      });
      if (response) {
        onSave();
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 max-w-lg w-full text-white mx-auto">
      <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
        <h2 className="text-lg font-bold text-indigo-400">Edit Profile Details</h2>
        <button onClick={onClose} className="hover:text-red-400">
          <X size={20} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">BIO TEXT</label>
          <textarea
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            placeholder="Tell us about yourself..."
            className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-sm text-gray-200 outline-none focus:border-indigo-500"
            rows={2}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">LIVE IN</label>
            <input
              type="text"
              value={liveIn}
              onChange={(e) => setLiveIn(e.target.value)}
              placeholder="e.g. San Francisco, CA"
              className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-sm text-gray-200 outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">HOMETOWN</label>
            <input
              type="text"
              value={homeTown}
              onChange={(e) => setHomeTown(e.target.value)}
              placeholder="e.g. Chicago, IL"
              className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-sm text-gray-200 outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">WORKPLACE</label>
            <input
              type="text"
              value={workPlace}
              onChange={(e) => setWorkPlace(e.target.value)}
              placeholder="e.g. Google"
              className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-sm text-gray-200 outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">EDUCATION</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g. Stanford University"
              className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-sm text-gray-200 outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">RELATIONSHIP STATUS</label>
            <select
              value={relationShip}
              onChange={(e) => setRelationShip(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-sm text-gray-200 outline-none focus:border-indigo-500"
            >
              <option value="">Select status</option>
              <option value="Single">Single</option>
              <option value="In a relationship">In a relationship</option>
              <option value="Married">Married</option>
              <option value="It's complicated">It's complicated</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">PHONE NUMBER</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +1 555-0199"
              className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-sm text-gray-200 outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-md text-sm transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white font-medium rounded-md text-sm transition"
          >
            {isSaving ? "Saving..." : "Save Details"}
          </button>
        </div>
      </form>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="flex flex-col items-center animate-pulse">
    <div className="relative isolate w-[70vw] min-h-screen ml-10 text-white shadow-2xl bg-[#0f0f10]/85 border-x border-slate-900/50 overflow-hidden">
      {/* Ambient background placeholder */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-10 bg-gradient-to-b from-slate-800 to-transparent" />
      {/* Cover photo skeleton */}
      <div className="w-full h-[300px] bg-slate-800" />
      
      {/* Profile info skeleton */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-5 -mt-20 z-10 pb-4 border-b border-gray-800">
          {/* Avatar skeleton */}
          <div className="w-[170px] h-[170px] rounded-full border-4 border-indigo-800 bg-slate-800 shrink-0 shadow-lg" />
          
          {/* Name & Stats skeleton */}
          <div className="flex-1 space-y-3 pb-2 text-center md:text-left w-full">
            <div className="h-8 bg-slate-800 rounded w-1/3 mx-auto md:mx-0" />
            <div className="h-4 bg-slate-800 rounded w-1/2 mx-auto md:mx-0" />
            <div className="flex justify-center md:justify-start items-center gap-6">
              <div className="h-4 bg-slate-800 rounded w-20" />
              <div className="h-4 bg-slate-800 rounded w-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs list skeleton */}
      <div className="flex justify-start gap-6 bg-transparent px-6 border-b border-gray-800 py-4">
        <div className="h-4 bg-slate-800 rounded w-16" />
        <div className="h-4 bg-slate-800 rounded w-16" />
        <div className="h-4 bg-slate-800 rounded w-16" />
        <div className="h-4 bg-slate-800 rounded w-16" />
      </div>

      {/* Tab content skeleton */}
      <div className="mt-6 px-6 pb-10 space-y-6 max-w-2xl mx-auto">
        <div className="bg-[#242526] p-4 rounded-xl border border-gray-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-800 rounded-full" />
            <div className="flex-1 h-8 bg-slate-800 rounded-full" />
          </div>
        </div>
        <div className="bg-[#242526] p-4 rounded-xl border border-gray-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-800 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 bg-slate-800 rounded w-1/3" />
              <div className="h-2.5 bg-slate-800 rounded w-1/4" />
            </div>
          </div>
          <div className="h-40 bg-slate-800 rounded-lg w-full" />
        </div>
      </div>
    </div>
  </div>
);

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const profileInputRef = useRef<HTMLInputElement | null>(null);

  const [profileData, setProfileData] = useState<any>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [friendshipStatus, setFriendshipStatus] = useState<string>("none");
  const [friendActionLoading, setFriendActionLoading] = useState(false);

  // Cover & Profile uploading status
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingProfile, setIsUploadingProfile] = useState(false);

  // User posts state
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(true);

  // Post Creator State
  const [newPostContent, setNewPostContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  // Inline comment details
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});
  const [activeDropdownPostId, setActiveDropdownPostId] = useState<string | null>(null);

  const loggedInUserDetail = typeof window !== "undefined" ? localStorage?.getItem("user") : null;
  const loggedInUser = loggedInUserDetail ? JSON.parse(loggedInUserDetail) : null;

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(/[\s_-]+/)
      .map((word: string) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getRelativeTime = (dateString?: string) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const loadUserProfile = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const response = await userServices.getUserProfile(id as string);
      if (response && response.status === "success") {
        setProfileData(response.data.profile);
        setIsOwner(response.data.isOwner);
        setFriendshipStatus(response.data.friendshipStatus || "none");
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserPosts = async () => {
    if (!id) return;
    try {
      setIsPostsLoading(true);
      const response = await postServices.getPostsByUserId(id as string);
      if (response && response.status === "success") {
        setUserPosts(response.data || []);
      }
    } catch (error) {
      console.error("Error loading user posts:", error);
    } finally {
      setIsPostsLoading(false);
    }
  };

  useEffect(() => {
    loadUserProfile();
    loadUserPosts();
  }, [id]);

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !id) return;

    try {
      setIsUploadingCover(true);
      const formData = new FormData();
      formData.append("coverPhoto", files[0]);

      const response = await userServices.updateCoverPhoto(id as string, formData);
      if (response) {
        await loadUserProfile();
      }
    } catch (error) {
      console.error("Error uploading cover photo:", error);
    } finally {
      setIsUploadingCover(false);
      e.target.value = "";
    }
  };

  const handleProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !id) return;

    try {
      setIsUploadingProfile(true);
      const formData = new FormData();
      formData.append("profilePicture", files[0]);

      const response = await userServices.updateUserProfile(id as string, formData);
      if (response) {
        await loadUserProfile();
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setIsUploadingProfile(false);
      e.target.value = "";
    }
  };

  const handleFriendshipAction = async (action: "send" | "accept" | "delete" | "unfriend" | "cancel") => {
    if (!profileData || !id) return;
    try {
      setFriendActionLoading(true);
      if (action === "send" || action === "accept") {
        const response = await userServices.followUser(id as string);
        if (response) {
          await loadUserProfile();
        }
      } else if (action === "unfriend" || action === "cancel") {
        const response = await userServices.unfollowUser(id as string);
        if (response) {
          await loadUserProfile();
        }
      } else if (action === "delete") {
        const response = await userServices.deleteFriendRequest(id as string);
        if (response) {
          await loadUserProfile();
        }
      }
    } catch (error) {
      console.error(`Error performing friend action: ${action}`, error);
    } finally {
      setFriendActionLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    try {
      setIsPosting(true);
      const formData = new FormData();
      formData.append("content", newPostContent.trim());

      const response = await postServices.createPost(formData);
      if (response) {
        setNewPostContent("");
        await loadUserPosts();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const response = await postServices.deletePost(postId);
      if (response) {
        setUserPosts((prev) => prev.filter((p) => p._id !== postId));
        setActiveDropdownPostId(null);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const response = await postServices.likePost(postId);
      if (response && response.status === "success") {
        setUserPosts((prevPosts) =>
          prevPosts.map((p) => (p._id === postId ? response.data : p))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async (postId: string) => {
    const text = commentTexts[postId] || "";
    if (!text.trim()) return;

    try {
      const response = await postServices.addCommentToPost(postId, text);
      if (response && response.status === "success") {
        setUserPosts((prevPosts) =>
          prevPosts.map((p) => (p._id === postId ? response.data : p))
        );
        setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = async (postId: string) => {
    try {
      const response = await postServices.sharePost(postId);
      if (response && response.status === "success") {
        setUserPosts((prevPosts) =>
          prevPosts.map((p) => (p._id === postId ? response.data : p))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openBioEdit = () => {
    if (!id || !profileData) return;
    openModal(
      <EditBioModal
        currentBio={profileData.bio}
        userId={id as string}
        onSave={loadUserProfile}
        onClose={closeModal}
      />
    );
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!profileData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
        <p className="text-red-400 font-semibold text-lg">Profile Not Found</p>
        <p className="text-gray-500 text-sm mt-1">The requested user could not be found.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  const username = profileData.username || "User";
  const coverUrl = profileData.coverPhoto || "/cover.jpg";
  const profileUrl = profileData.profilePicture || "/IMG_4274.JPG";
  const initials = getInitials(username);

  const isFollowing = profileData.followers?.some((f: any) => f._id === loggedInUser?._id);

  // Filter photos (images or videos) from user posts
  const userPhotos = userPosts.filter((p) => p.mediaUrl);

  return (
    <div className="flex flex-col items-center">
      <div className="relative isolate w-[70vw] min-h-screen ml-10 text-white shadow-2xl bg-[#0f0f10]/85 border-x border-slate-900/50 overflow-hidden">
        {/* Ambient background using the cover photo */}
        <div 
          className="absolute inset-0 -z-10 pointer-events-none opacity-20 blur-[100px] bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${coverUrl})` }}
        />
        {/* ================= COVER PHOTO ================= */}
        <div className="relative w-full h-[300px] overflow-hidden bg-slate-900 border-b border-slate-800">
          <img
            src={coverUrl}
            alt="cover"
            className="w-full h-full object-cover z-0"
          />

          {isUploadingCover && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
              <Loader2 className="animate-spin text-white" size={32} />
            </div>
          )}

          {isOwner && (
            <button
              onClick={() => coverInputRef.current?.click()}
              className="absolute bottom-4 right-4 z-20 bg-black/60 px-4 py-2 rounded-md text-sm hover:bg-black/80 flex items-center gap-1.5 transition"
            >
              <Camera size={16} />
              Change Cover
            </button>
          )}

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="hidden"
          />
        </div>

        {/* ================= PROFILE INFO ================= */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative flex flex-col md:flex-row items-center md:items-end gap-5 -mt-20 z-10 pb-4 border-b border-gray-800">
            {/* PROFILE IMAGE */}
            <div className="relative w-[170px] h-[170px] rounded-full border-4 border-indigo-800 overflow-hidden bg-slate-800 group shrink-0 shadow-lg">
              <img
                src={profileUrl}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
              {isUploadingProfile && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full z-10">
                  <Loader2 className="animate-spin text-white" size={24} />
                </div>
              )}
              {isOwner && (
                <button
                  onClick={() => profileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-200 text-white text-xs gap-1 cursor-pointer"
                >
                  <Camera size={24} />
                  <span>Update Photo</span>
                </button>
              )}
            </div>

            <input
              ref={profileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileChange}
              className="hidden"
            />

            {/* NAME & STATS */}
            <div className="flex-1 text-center md:text-left pb-2">
              <h1 className="text-3xl font-bold capitalize mb-1">{username}</h1>
              <p className="text-sm text-gray-400 mb-2">{profileData.bio?.bioText || "No bio yet."}</p>
              <div className="flex justify-center md:justify-start items-center gap-6 text-sm">
                <span className="text-gray-300">
                  <strong className="text-white">{profileData.friends?.length || 0}</strong> Friends
                </span>
              </div>
            </div>

            {/* RELATION ACTION BUTTONS */}
            {!isOwner && (
              <div className="flex gap-3 mb-2 shrink-0">
                {friendshipStatus === "friends" && (
                  <button
                    onClick={() => handleFriendshipAction("unfriend")}
                    disabled={friendActionLoading}
                    className="px-6 py-2 rounded-md font-medium text-sm transition flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white cursor-pointer"
                  >
                    <UserMinus size={16} />
                    Unfriend
                  </button>
                )}
                {friendshipStatus === "sent_pending" && (
                  <button
                    onClick={() => handleFriendshipAction("cancel")}
                    disabled={friendActionLoading}
                    className="px-6 py-2 rounded-md font-medium text-sm transition flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                  >
                    <UserMinus size={16} />
                    Cancel Request
                  </button>
                )}
                {friendshipStatus === "received_pending" && (
                  <>
                    <button
                      onClick={() => handleFriendshipAction("accept")}
                      disabled={friendActionLoading}
                      className="px-6 py-2 rounded-md font-medium text-sm transition flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                    >
                      <UserCheck size={16} />
                      Accept Request
                    </button>
                    <button
                      onClick={() => handleFriendshipAction("delete")}
                      disabled={friendActionLoading}
                      className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-md font-medium text-sm transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <UserMinus size={16} />
                      Delete Request
                    </button>
                  </>
                )}
                {friendshipStatus === "none" && (
                  <button
                    onClick={() => handleFriendshipAction("send")}
                    disabled={friendActionLoading}
                    className="px-6 py-2 rounded-md font-medium text-sm transition flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                  >
                    <UserPlus size={16} />
                    Add Friend
                  </button>
                )}
                <button
                  onClick={() => router.push(`/messages?chat=${profileData._id}`)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md font-medium text-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare size={16} />
                  Message
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="my-6">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="flex justify-start gap-6 bg-transparent px-6 border-b border-gray-800 rounded-none w-full h-auto py-0">
              {["posts", "about", "friends", "photos"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-gray-400 data-[state=active]:text-indigo-400 bg-transparent data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 rounded-none pb-3 pt-0 cursor-pointer font-medium text-sm transition-all"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-6 px-6 pb-10">
              {/* ================= POSTS TAB ================= */}
              <TabsContent value="posts">
                <div className="space-y-4 max-w-2xl mx-auto">
                  {/* Create Post (Only shown if Owner) */}
                  {isOwner && (
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-700 shrink-0">
                          {initials}
                        </div>
                        <input
                          type="text"
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          placeholder="What's on your mind?"
                          disabled={isPosting}
                          className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-800 outline-none focus:bg-gray-200 placeholder-gray-500"
                        />
                        {(newPostContent.trim()) && (
                          <button
                            onClick={handleCreatePost}
                            disabled={isPosting}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 px-5 py-2 rounded-full text-xs font-semibold text-white transition shrink-0"
                          >
                            {isPosting ? "Posting..." : "Post"}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Render Posts List */}
                  {isPostsLoading ? (
                    <div className="space-y-4">
                      <PostSkeleton />
                      <PostSkeleton />
                    </div>
                  ) : userPosts.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 text-sm bg-white rounded-xl border border-gray-200 shadow-sm">
                      No posts published yet.
                    </div>
                  ) : (
                    userPosts.map((post) => {
                      const postCreator = post.user?.username || post.user?.email || "User";
                      const postInitials = getInitials(postCreator);
                      const postTime = getRelativeTime(post.createdAt);
                      const hasLiked = loggedInUser && post.likes?.includes(loggedInUser._id);

                      return (
                        <div
                          key={post._id}
                          className="bg-white text-gray-800 rounded-xl shadow-sm border border-gray-200 relative overflow-hidden"
                        >
                          {/* Header */}
                          <div className="flex items-center justify-between px-4 py-3 relative">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center font-semibold text-white">
                                {postInitials}
                              </div>
                              <div>
                                <p className="font-semibold leading-tight text-sm text-gray-900">{postCreator}</p>
                                <p className="text-[10px] text-gray-500">{postTime}</p>
                              </div>
                            </div>
                            {isOwner && (
                              <div className="relative">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveDropdownPostId(
                                      activeDropdownPostId === post._id ? null : post._id
                                    )
                                  }
                                  className="p-1 hover:bg-gray-100 rounded-full transition cursor-pointer"
                                >
                                  <MoreVertical className="text-gray-500 w-4 h-4" />
                                </button>
                                {activeDropdownPostId === post._id && (
                                  <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-20 py-1 min-w-[100px]">
                                    <button
                                      type="button"
                                      onClick={() => handleDeletePost(post._id)}
                                      className="w-full text-left px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 hover:text-red-600 transition font-medium"
                                    >
                                      Delete Post
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Caption */}
                          {post.content && (
                            <div className="px-4 pb-3">
                              <p className="text-sm text-gray-800">{post.content}</p>
                            </div>
                          )}

                          {/* Media */}
                          {post.mediaUrl && (
                            <div className="w-full flex items-center justify-center bg-gray-50 border-y border-gray-200">
                              {post.mediaType === "video" ? (
                                <video
                                  src={post.mediaUrl}
                                  controls
                                  className="max-h-[400px] w-full object-contain"
                                />
                              ) : (
                                <img
                                  src={post.mediaUrl}
                                  alt="post media"
                                  className="max-h-[400px] w-full object-contain"
                                  loading="lazy"
                                />
                              )}
                            </div>
                          )}

                          {/* Stats */}
                          <div className="flex justify-between px-4 pt-3 text-xs text-gray-500">
                            <p>{post.likeCount || 0} likes</p>
                            <div className="flex gap-4">
                              <p>{post.commentCount || 0} comments</p>
                              <p>{post.shareCount || 0} shares</p>
                            </div>
                          </div>

                          <div className="mx-4 my-2 border-t border-gray-200" />

                          {/* Actions */}
                          <div className="flex justify-around px-4 py-1 text-xs text-gray-600">
                            <button
                              onClick={() => handleLike(post._id)}
                              className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-md transition"
                            >
                              <ThumbsUp
                                size={16}
                                className={hasLiked ? "text-blue-500 fill-blue-500" : ""}
                              />
                              <span className={hasLiked ? "text-blue-500 font-medium" : "font-medium"}>Like</span>
                            </button>

                            <button
                              onClick={() => {
                                setOpenComments((prev) => ({
                                  ...prev,
                                  [post._id]: !prev[post._id],
                                }));
                              }}
                              className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-md transition"
                            >
                              <MessageCircle size={16} />
                              <span className="font-medium">Comment</span>
                            </button>

                            <button
                              onClick={() => handleShare(post._id)}
                              className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-md transition"
                            >
                              <Share size={16} />
                              <span className="font-medium">Share</span>
                            </button>
                          </div>

                          {/* Comment Box */}
                          {openComments[post._id] && (
                            <div className="px-4 pb-4 space-y-3 border-t border-gray-200 pt-3 bg-gray-50/50">
                              {/* Comment List */}
                              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                                {(post.comments || []).map((c: any, i: number) => {
                                  const cUser = c.user?.username || c.user?.email || "User";
                                  const cInitials = getInitials(cUser);
                                  return (
                                    <div key={c._id || i} className="flex gap-2 items-start text-xs">
                                      <div className="h-6 w-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0">
                                        {cInitials}
                                      </div>
                                      <div className="flex-1 bg-gray-100 p-2 rounded-xl border border-gray-200">
                                        <div className="flex justify-between items-center mb-1">
                                          <p className="font-semibold text-gray-800">{cUser}</p>
                                          <p className="text-[9px] text-gray-500">{getRelativeTime(c.createdAt)}</p>
                                        </div>
                                        <p className="text-gray-700">{c.text}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                                {(post.comments || []).length === 0 && (
                                  <p className="text-[10px] text-gray-400 text-center py-1 font-medium">No comments yet.</p>
                                )}
                              </div>

                              {/* Write Comment */}
                              <div className="flex gap-2 pt-2 border-t border-gray-200">
                                <input
                                  type="text"
                                  placeholder="Write a comment..."
                                  className="flex-1 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-md outline-none text-xs text-gray-800 placeholder-gray-400"
                                  value={commentTexts[post._id] || ""}
                                  onChange={(e) => {
                                    setCommentTexts((prev) => ({
                                      ...prev,
                                      [post._id]: e.target.value,
                                    }));
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleAddComment(post._id);
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => handleAddComment(post._id)}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold"
                                >
                                  Post
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </TabsContent>

              {/* ================= ABOUT TAB ================= */}
              <TabsContent value="about">
                <div className="bg-[#242526] rounded-xl p-5 space-y-4 border border-gray-800 shadow-md max-w-xl mx-auto">
                  <h2 className="text-lg font-bold text-indigo-400 mb-2 border-b border-gray-800 pb-2">About Details</h2>

                  <div className="space-y-4 text-sm text-gray-200">
                    <div className="flex items-center gap-3">
                      <MapPin className="text-gray-400 shrink-0" size={18} />
                      <p>
                        Lives in <span className="font-semibold text-white">{profileData.bio?.liveIn || "Not specified"}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Home className="text-gray-400 shrink-0" size={18} />
                      <p>
                        From Hometown <span className="font-semibold text-white">{profileData.bio?.homeTown || "Not specified"}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="text-gray-400 shrink-0" size={18} />
                      <p>
                        Works at <span className="font-semibold text-white">{profileData.bio?.workPlace || "Not specified"}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="text-gray-400 shrink-0" size={18} />
                      <p>
                        Studied at <span className="font-semibold text-white">{profileData.bio?.education || "Not specified"}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Heart className="text-gray-400 shrink-0" size={18} />
                      <p>
                        Relationship Status: <span className="font-semibold text-white">{profileData.bio?.relationShip || "Not specified"}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="text-gray-400 shrink-0" size={18} />
                      <p>
                        Phone Number: <span className="font-semibold text-white">{profileData.bio?.phone || "Not specified"}</span>
                      </p>
                    </div>
                  </div>

                  {isOwner && (
                    <button
                      onClick={openBioEdit}
                      className="w-full mt-3 bg-[#3a3b3c] py-2 rounded-md text-sm hover:bg-[#4a4b4c] font-medium transition"
                    >
                      Edit Details
                    </button>
                  )}
                </div>
              </TabsContent>

              {/* ================= FRIENDS TAB ================= */}
              <TabsContent value="friends">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-md font-bold mb-3 border-b border-gray-800 pb-2 text-indigo-400">
                      Friends ({profileData.friends?.length || 0})
                    </h2>
                    {(!profileData.friends || profileData.friends.length === 0) ? (
                      <p className="text-sm text-gray-500 py-2">No friends yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {profileData.friends.map((f: any) => {
                          const fInitials = getInitials(f.username);
                          return (
                            <div
                              key={f._id}
                              className="relative bg-[#242526] p-4 rounded-xl flex flex-col items-center gap-3 border border-gray-800 shadow-md hover:border-gray-700 transition"
                            >
                              <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-indigo-600 overflow-hidden flex items-center justify-center text-lg font-bold text-white shrink-0">
                                {f.profilePicture ? (
                                  <img src={f.profilePicture} alt="friend" className="w-full h-full object-cover" />
                                ) : (
                                  fInitials
                                )}
                              </div>
                              <p className="font-semibold text-sm text-white truncate max-w-full">{f.username}</p>
                              <Link
                                href={`/profile/${f._id}`}
                                className="text-xs bg-[#3a3b3c] hover:bg-[#4a4b4c] px-4 py-1.5 rounded-md font-medium text-gray-200 transition"
                              >
                                View Profile
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* ================= PHOTOS TAB ================= */}
              <TabsContent value="photos">
                {userPhotos.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 text-sm bg-[#242526] rounded-xl border border-gray-800">
                    No photos or videos posted yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {userPhotos.map((p) => (
                      <div
                        key={p._id}
                        className="w-full h-44 bg-slate-900 rounded-lg overflow-hidden border border-gray-800 shadow-md flex items-center justify-center"
                      >
                        {p.mediaType === "video" ? (
                          <video
                            src={p.mediaUrl}
                            className="w-full h-full object-cover hover:scale-105 transition duration-200 cursor-pointer"
                            onClick={() => {
                              openModal(
                                <div className="bg-black/90 p-2 max-w-4xl mx-auto flex items-center justify-center rounded-lg">
                                  <video src={p.mediaUrl} controls autoPlay className="max-h-[80vh] max-w-full" />
                                </div>
                              );
                            }}
                          />
                        ) : (
                          <img
                            src={p.mediaUrl}
                            alt="photo"
                            className="w-full h-full object-cover hover:scale-105 transition duration-200 cursor-pointer"
                            onClick={() => {
                              openModal(
                                <div className="bg-black/90 p-2 max-w-4xl mx-auto flex items-center justify-center rounded-lg">
                                  <img src={p.mediaUrl} alt="expanded" className="max-h-[80vh] max-w-full object-contain" />
                                </div>
                              );
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Page;
