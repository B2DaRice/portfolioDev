import { ProfileForm, ProfileFormProps } from "./profile-form" 

export default function AddHostProperty({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) {
    const profileFormProps: ProfileFormProps = {
        property: { name: searchParams.name }, // 
      };
    return (
        <div className="space-y-6">
            <ProfileForm {...profileFormProps}/>
        </div>
    )
  }
  