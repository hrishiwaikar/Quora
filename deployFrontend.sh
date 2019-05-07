rsync -r -avze "ssh -i /Users/vinit/work/login/canvas-server.pem" --exclude '**/.git*'  --exclude '**/node_modules/*' frontend/* ubuntu@18.221.125.167:/home/ubuntu/deploy/frontend/

