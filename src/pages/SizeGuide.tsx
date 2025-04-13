
import React from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const SizeGuide = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Size Guide</h1>
          <p className="text-gray-600 text-center mb-10">
            Find your perfect fit with our comprehensive size guide
          </p>

          <Tabs defaultValue="dresses">
            <TabsList className="w-full mb-8">
              <TabsTrigger value="dresses">Dresses</TabsTrigger>
              <TabsTrigger value="tops">Tops</TabsTrigger>
              <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
              <TabsTrigger value="outerwear">Outerwear</TabsTrigger>
            </TabsList>

            <TabsContent value="dresses">
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h2 className="text-xl font-semibold mb-4">How to Measure</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">Bust</h3>
                        <p className="text-sm text-gray-600">Measure around the fullest part of your bust, keeping the tape parallel to the floor.</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Waist</h3>
                        <p className="text-sm text-gray-600">Measure around your natural waistline, which is the narrowest part of your torso.</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Hips</h3>
                        <p className="text-sm text-gray-600">Measure around the fullest part of your hips, about 8 inches below your waistline.</p>
                      </div>
                    </div>
                    <div>
                      <img 
                        src="/placeholder.svg" 
                        alt="How to measure dress size" 
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h2 className="text-xl font-semibold mb-4">Dress Size Chart</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Size</th>
                          <th className="px-4 py-2 text-left">Bust (in)</th>
                          <th className="px-4 py-2 text-left">Waist (in)</th>
                          <th className="px-4 py-2 text-left">Hips (in)</th>
                          <th className="px-4 py-2 text-left">US Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="px-4 py-2">XS</td>
                          <td className="px-4 py-2">31-32</td>
                          <td className="px-4 py-2">24-25</td>
                          <td className="px-4 py-2">34-35</td>
                          <td className="px-4 py-2">0-2</td>
                        </tr>
                        <tr className="border-t">
                          <td className="px-4 py-2">S</td>
                          <td className="px-4 py-2">33-34</td>
                          <td className="px-4 py-2">26-27</td>
                          <td className="px-4 py-2">36-37</td>
                          <td className="px-4 py-2">4-6</td>
                        </tr>
                        <tr className="border-t">
                          <td className="px-4 py-2">M</td>
                          <td className="px-4 py-2">35-36</td>
                          <td className="px-4 py-2">28-29</td>
                          <td className="px-4 py-2">38-39</td>
                          <td className="px-4 py-2">8-10</td>
                        </tr>
                        <tr className="border-t">
                          <td className="px-4 py-2">L</td>
                          <td className="px-4 py-2">37-38</td>
                          <td className="px-4 py-2">30-31</td>
                          <td className="px-4 py-2">40-41</td>
                          <td className="px-4 py-2">12-14</td>
                        </tr>
                        <tr className="border-t">
                          <td className="px-4 py-2">XL</td>
                          <td className="px-4 py-2">39-40</td>
                          <td className="px-4 py-2">32-33</td>
                          <td className="px-4 py-2">42-43</td>
                          <td className="px-4 py-2">16-18</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h2 className="text-xl font-semibold mb-4">Dress Length Guide</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">Mini</h3>
                        <p className="text-sm text-gray-600">Above the knee, approximately 30-35 inches from shoulder to hem.</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Midi</h3>
                        <p className="text-sm text-gray-600">Between knee and ankle, approximately 40-45 inches from shoulder to hem.</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Maxi</h3>
                        <p className="text-sm text-gray-600">To the ankle or floor, approximately 55-60 inches from shoulder to hem.</p>
                      </div>
                    </div>
                    <div>
                      <img 
                        src="/placeholder.svg" 
                        alt="Dress length guide" 
                        className="w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h2 className="text-xl font-semibold mb-4">Tips for the Perfect Fit</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li className="text-gray-700">If you're between sizes, we recommend going up a size for a more comfortable fit.</li>
                    <li className="text-gray-700">Consider the fabric and cut of the dress. Stretchy fabrics offer more flexibility in sizing.</li>
                    <li className="text-gray-700">For fitted dresses, pay close attention to both waist and hip measurements.</li>
                    <li className="text-gray-700">Remember that different brands may have slight variations in their sizing.</li>
                    <li className="text-gray-700">If you're unsure about your size, feel free to contact our customer service team for assistance.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tops">
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Size information for tops will be available soon.</p>
              </div>
            </TabsContent>

            <TabsContent value="bottoms">
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Size information for bottoms will be available soon.</p>
              </div>
            </TabsContent>

            <TabsContent value="outerwear">
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Size information for outerwear will be available soon.</p>
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-10" />

          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Still have questions about sizing?</h2>
            <p className="text-gray-600">Our customer service team is here to help you find the perfect fit.</p>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <p className="font-medium">Email</p>
                <p className="text-gray-600">support@fashionstore.com</p>
              </div>
              <div className="text-center">
                <p className="font-medium">Phone</p>
                <p className="text-gray-600">1-800-555-STYLE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SizeGuide;
