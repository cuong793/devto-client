import Image from "next/image";
import Link from "next/link";

const CreatePost = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center">
        <Link href='/'>
          <Image src='/logo-dev.jpeg' alt="" width={60} height={60}></Image>
        </Link>
        <h3 className="font-medium">Create Post</h3>
      </div>

      <form>

        <label>
          add a cover image
          <input type="file" accept="image/*" />
        </label>

        <input type="text" placeholder='New post title here...' />

        <div>
          <label>Choose a posting category</label>
          <br />
          <select name="isTag">
            <option value="nextjs">Nextjs</option>
            <option value="reactjs">Reactjs</option>
            <option value="javascript">Javascript</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default CreatePost;