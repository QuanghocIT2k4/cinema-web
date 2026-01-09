import { useState } from 'react'
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Select, Checkbox, Textarea, Label } from '@/shared/components/ui'

export default function TestComponents() {
  const [selectedValue, setSelectedValue] = useState('')
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Component Test Page
        </h1>

        {/* Button Tests */}
        <Card title="Button Components">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Variants</h3>
              <div className="flex gap-2 flex-wrap">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Sizes</h3>
              <div className="flex gap-2 items-center flex-wrap">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">States</h3>
              <div className="flex gap-2 flex-wrap">
                <Button isLoading>Loading...</Button>
                <Button disabled>Disabled</Button>
                <Button onClick={() => alert('Clicked!')}>Click Me</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Custom Styles</h3>
              <div className="flex gap-2 flex-wrap">
                <Button className="w-full">Full Width</Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Custom Color
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Input Tests */}
        <Card title="Input Components">
          <div className="space-y-4">
            <Input 
              label="Basic Input"
              placeholder="Enter text here"
            />

            <Input 
              label="Email Input"
              type="email"
              placeholder="user@example.com"
            />

            <Input 
              label="Password Input"
              type="password"
              placeholder="Enter password"
            />

            <Input 
              label="Input with Error"
              placeholder="This has an error"
              error="This field is required"
            />

            <Input 
              placeholder="Input without label"
            />
          </div>
        </Card>

        {/* Select Tests */}
        <Card title="Select Components">
          <div className="space-y-4">
            <Select
              label="Choose an option"
              options={[
                { value: '', label: 'Select...' },
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' },
              ]}
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            />

            <Select
              label="Select with Error"
              error="Please select an option"
              options={[
                { value: '', label: 'Select...' },
                { value: '1', label: 'Option 1' },
              ]}
            />
          </div>
        </Card>

        {/* Checkbox Tests */}
        <Card title="Checkbox Components">
          <div className="space-y-4">
            <Checkbox
              label="I agree to the terms and conditions"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />

            <Checkbox
              label="Subscribe to newsletter"
            />

            <Checkbox
              label="Checkbox with Error"
              error="This field is required"
            />
          </div>
        </Card>

        {/* Textarea Tests */}
        <Card title="Textarea Components">
          <div className="space-y-4">
            <Textarea
              label="Description"
              placeholder="Enter description here"
            />

            <Textarea
              label="Comments"
              placeholder="Enter your comments"
              rows={4}
            />

            <Textarea
              label="Textarea with Error"
              placeholder="This has an error"
              error="This field is required"
            />
          </div>
        </Card>

        {/* Label Tests */}
        <Card title="Label Component">
          <div className="space-y-4">
            <Label>Normal Label</Label>
            <Label required>Required Label</Label>
          </div>
        </Card>

        {/* Card Tests */}
        <Card title="Card Components">
          <div className="space-y-4">
            <Card>
              <p className="text-gray-600">Basic card without title or footer</p>
            </Card>

            <Card title="Card with Title">
              <p className="text-gray-600">This card has a title</p>
            </Card>

            <Card 
              title="Card with Footer"
              description="This card has both title and footer"
              footer={
                <div className="flex gap-2 justify-end">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="default">Save</Button>
                </div>
              }
            >
              <p className="text-gray-600">Card content here</p>
            </Card>
            
            {/* Card với sub-components */}
            <Card>
              <CardHeader>
                <CardTitle>Card with Sub-components</CardTitle>
                <CardDescription>Using CardHeader, CardTitle, CardDescription</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">This is the content area</p>
              </CardContent>
              <CardFooter>
                <Button variant="default">Action</Button>
              </CardFooter>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <p className="text-gray-600">Custom styled card</p>
            </Card>
          </div>
        </Card>

        {/* Combined Example */}
        <Card 
          title="Combined Example - Contact Form"
          description="Example form using all components"
          footer={
            <div className="flex gap-2 justify-end">
              <Button variant="outline">Cancel</Button>
              <Button variant="default">
                Submit
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <Input 
              label="Name"
              placeholder="Enter your name"
            />
            <Input 
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <Select
              label="Subject"
              options={[
                { value: '', label: 'Select subject...' },
                { value: 'general', label: 'General Inquiry' },
                { value: 'support', label: 'Support' },
                { value: 'feedback', label: 'Feedback' },
              ]}
            />
            <Textarea
              label="Message"
              placeholder="Enter your message"
              rows={4}
            />
            <Checkbox
              label="I agree to the privacy policy"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
