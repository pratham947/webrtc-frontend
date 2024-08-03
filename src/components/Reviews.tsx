import { Card, CardContent, CardHeader } from "./ui/card";

const Reviews = () => {
  return (
    <div className="flex flex-wrap max-w-6xl gap-4 cursor-pointer"> 
      {Array.from({ length: 5 }).map(() => (
        <Card className="my-2 hover:bg-[#2D2D2E]">
          <CardHeader>
            <div className="flex items-center gap-5">
              <div className="w-10">
                <img src="https://avatar.iran.liara.run/public/boy" />
              </div>
              <div>
                <p className="font-Montserrat">Pratham mehta</p>
                <p className="font-Montserrat">Gadha</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-Montserrat">One of the best product i have used</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Reviews;
