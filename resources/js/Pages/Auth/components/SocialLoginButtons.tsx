import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { SiGithub } from '@icons-pack/react-simple-icons';

export default function SocialLoginButtons() {

    const handleSocialLogin = (provider: string) => {
        window.location.href = route('social.redirect', { provider });
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>


            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin('github')}
            // disabled={processing}
            >
                <SiGithub />
                Continue with GitHub
            </Button>
        </div>
    );
}